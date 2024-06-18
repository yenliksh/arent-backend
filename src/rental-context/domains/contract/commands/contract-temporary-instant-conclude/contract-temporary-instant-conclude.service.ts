import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ContractRequestRepository } from '@domain-repositories/contract-request/contract-request.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { RentPeriodVersionRepository } from '@domain-repositories/rent-period-version/rent-period-version.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { ApartmentGuestsVO, IGuests } from '@domain-value-objects/apartment-guests.value-object';
import { CancellationPolicyVO } from '@domain-value-objects/cancellation-policy.value-object';
import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ShortTermRentPaymentTypeVO } from '@domain-value-objects/short-term-rent-payment-type.value-object';
import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ContractRequestEntity } from '@domains/contract-request/domain/entities/contract-request.entity';
import { ContractRequestStatus } from '@domains/contract-request/domain/types';
import { ContractRequestStatusVO } from '@domains/contract-request/domain/value-objects/request-status.value-object';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { BaseContractApartmentAdDataVO } from '@domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object';
import { ContractOfferAlreadyExistsProblem } from '@domains/contract/problems/contract-offer-already-exists.problem';
import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { UserEntity } from '@domains/user/domain/entities/user.entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import {
  ApartmentRentPeriodType,
  ContractStatus,
  ShortTermRentBookingType,
  ShortTermRentPaymentType,
} from '@infrastructure/enums';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException, ArgumentNotProvidedException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { ContractTemporaryInstantConcludeRequest } from './contract-temporary-instant-conclude.request';

@Injectable()
export class ContractTemporaryInstantConcludeService {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly contractRepository: ContractRepository,
    private readonly contractRequestRepository: ContractRequestRepository,
    private readonly userRepository: UserRepository,
    private readonly rentPeriodVersionRepository: RentPeriodVersionRepository,
    private readonly contractOfferQueue: ContractOfferQueue,
    private readonly pubSubService: PubSubService,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async handle(dto: ContractTemporaryInstantConcludeRequest, userId: string): Promise<Result<UUID, Error>> {
    const { apartmentAdId, arrivalDate, departureDate, guests, rentPaymentType, comment } = dto;

    const trxId = await this.unitOfWork.start();
    try {
      const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId, trxId);

      if (!apartmentAd) {
        throw new NotFoundException('ApartmentAd not found');
      }
      if (apartmentAd.rentBookingType !== ShortTermRentBookingType.INSTANT) {
        throw new ArgumentNotProvidedException('Instant booking not provided in this apartment ad');
      }

      const dates = this.getContractUTCDates(apartmentAd, arrivalDate, departureDate);

      const existingContract = await this.contractRepository.findOne(
        {
          apartmentAdId: new UUID(apartmentAdId),
          details: {
            arrivalDate: dates.arrivalDateUTC,
            departureDate: dates.departureDateUTC,
          },
          shortTermRentBookingType: ShortTermRentBookingTypeVO.create(ShortTermRentBookingType.INSTANT),
          tenantId: new UUID(userId),
        },
        trxId,
      );

      if (existingContract && !existingContract.isTemporary) {
        throw new ArgumentInvalidException('Contract already permanent concluded');
      }

      if (existingContract) {
        this.publishInnopayPageUrl(
          userId,
          existingContract.paymentDataOrFail.paymentUrl,
          existingContract.paymentDataOrFail.paymentUrlStartAt,
          {
            contractId: existingContract.id.value,
          },
        );
        await this.unitOfWork.execute(trxId);
        return Ok(existingContract.id);
      }

      const [rentPeriodVersion, landlord] = await Promise.all([
        this.rentPeriodVersionRepository.findLast(trxId),
        this.userRepository.findByApartmentAdId(apartmentAdId, trxId),
      ]);

      if (!landlord) {
        throw new NotFoundException('Landlord not found');
      }
      if (!rentPeriodVersion) {
        throw new NotFoundException('RentPeriodVersion not found');
      }

      const { id: contractRequestId } = await this.createContractRequest(
        {
          apartmentAdId: new UUID(apartmentAdId),
          arrivalDate: dates.arrivalDateUTC,
          departureDate: dates.departureDateUTC,
          guests,
          landlordId: apartmentAd.landlordId,
          rentPeriodVersion,
          shortTermRentPaymentType: rentPaymentType,
          tenantId: new UUID(userId),
          comment,
        },
        trxId,
      );

      const contract = await this.createContract(
        {
          apartmentAd,
          arrivalDate: dates.arrivalDateUTC,
          contractRequestId,
          departureDate: dates.departureDateUTC,
          guests: ApartmentGuestsVO.create(guests),
          landlord,
          rentPeriodVersion,
          shortTermRentPaymentType: rentPaymentType,
          tenantId: new UUID(userId),
        },
        trxId,
      );

      await this.unitOfWork.commit(trxId);

      this.contractOfferQueue.addTemporaryInstantBookingJob({ contractId: contract.id.value });

      return Ok(contract.id);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      return Err(error as Error);
    }
  }

  private async createContractRequest(
    props: {
      apartmentAdId: UUID;
      arrivalDate: DateTimeISOTZVO;
      departureDate: DateTimeISOTZVO;
      guests: IGuests;
      rentPeriodVersion: RentPeriodVersionEntity;
      landlordId: UUID;
      tenantId: UUID;
      comment?: string;
      shortTermRentPaymentType: ShortTermRentPaymentType;
    },
    trxId?: TransactionId,
  ) {
    const {
      apartmentAdId,
      guests,
      arrivalDate,
      departureDate,
      rentPeriodVersion,
      landlordId,
      tenantId,
      comment,
      shortTermRentPaymentType,
    } = props;

    const isApartmentFree = await this.contractRequestRepository.checkApartmentIsFree({
      apartmentAdId: apartmentAdId.value,
      apartmentRentPeriodType: ApartmentRentPeriodType.SHORT_TERM,
      from: arrivalDate.value,
      to: departureDate.value,
      trxId,
    });

    if (!isApartmentFree) {
      throw new ContractOfferAlreadyExistsProblem();
    }

    const contractRequest = ContractRequestEntity.create({
      apartmentAdId,
      arrivalDate,
      departureDate,
      landlordId,
      tenantId,
      comment,
      shortTermRentBookingType: ShortTermRentBookingTypeVO.create(ShortTermRentBookingType.INSTANT),
      shortTermRentPaymentType: ShortTermRentPaymentTypeVO.create(shortTermRentPaymentType),
      apartmentRentPeriodType: ApartmentRentPeriodType.SHORT_TERM,
      status: ContractRequestStatusVO.create(ContractRequestStatus.ACCEPTED),
      guests: ApartmentGuestsVO.create(guests),
      rentPeriodVersion,
    });

    await this.contractRequestRepository.save(contractRequest, trxId);

    return contractRequest;
  }

  private async createContract(
    props: {
      tenantId: UUID;
      apartmentAd: ApartmentAdEntity;
      arrivalDate: DateTimeISOTZVO;
      departureDate: DateTimeISOTZVO;
      shortTermRentPaymentType: ShortTermRentPaymentType;
      guests: ApartmentGuestsVO;
      contractRequestId: UUID;
      rentPeriodVersion: RentPeriodVersionEntity;
      landlord: UserEntity;
    },
    trxId?: TransactionId,
  ) {
    const {
      arrivalDate,
      departureDate,
      shortTermRentPaymentType,
      guests,
      apartmentAd,
      tenantId,
      contractRequestId,
      rentPeriodVersion,
      landlord,
    } = props;

    if (!apartmentAd.baseApartmentAdDataForContract) {
      throw new NotFoundException('Apartment ad address not found');
    }

    const contract = ContractEntity.create({
      apartmentRentPeriodType: ApartmentRentPeriodType.SHORT_TERM,
      contractRequestId,
      status: ContractStatus.CREATED,
      tenantId,
      detailsProps: {
        arrivalDate,
        departureDate,
        rules: apartmentAd?.rules,
      },
      apartmentAdId: apartmentAd.id,
      landlordId: apartmentAd.landlordId,
      rentPeriodVersion,
      cancellationPolicyProps: CancellationPolicyVO.create(ApartmentRentPeriodType.SHORT_TERM, {
        shortTermCancellationPolicy: apartmentAd.shortTermRentCancellationPolicy,
        longTermCancellationPolicy: apartmentAd.longTermRentCancellationPolicy,
      }),
      costAndCurrency: apartmentAd.getCostAndCurrency(ApartmentRentPeriodType.SHORT_TERM),
      shortTermRentBookingType: ShortTermRentBookingTypeVO.create(ShortTermRentBookingType.INSTANT),
      shortTermRentPaymentType: ShortTermRentPaymentTypeVO.create(shortTermRentPaymentType),
      baseContractApartmentAdData: new BaseContractApartmentAdDataVO({
        title: apartmentAd.baseApartmentAdDataForContract.name,
        address: apartmentAd.baseApartmentAdDataForContract.address,
      }),
      guests,
      isFined: !!landlord?.numberFines,
      isTemporary: true,
    });

    contract.setPending();

    await this.contractRepository.save(contract, trxId);

    return contract;
  }

  private publishInnopayPageUrl(tenantId: string, url: string, startUrlDate: string, refs: { contractId: string }) {
    this.pubSubService.publish(PubSubTrigger.INNOPAY_PAGE_URL, {
      payingId: tenantId,
      url,
      startUrlDate: new Date(startUrlDate),
      ...refs,
    });
  }

  private getContractUTCDates(apartmentAd: ApartmentAdEntity, arrivalDate: string, departureDate: string) {
    const arrivalDateUTCISOString = DateUtil.parseWithZone(
      `${arrivalDate} ${apartmentAd.getArrivalTimeOrFail()}`,
      apartmentAd.getTimezoneOrFail(),
      true,
    ).toISOString();

    const departureDateUTCISOString = DateUtil.parseWithZone(
      `${departureDate} ${apartmentAd.getDepartureTimeOrFail()}`,
      apartmentAd.getTimezoneOrFail(),
      true,
    ).toISOString();

    const arrivalDateUTC = new DateTimeISOTZVO(arrivalDateUTCISOString);
    const departureDateUTC = new DateTimeISOTZVO(departureDateUTCISOString);

    return { arrivalDateUTC, departureDateUTC };
  }
}
