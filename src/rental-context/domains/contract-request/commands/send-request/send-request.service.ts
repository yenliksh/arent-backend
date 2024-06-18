import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { RentPeriodVersionRepository } from '@domain-repositories/rent-period-version/rent-period-version.repository';
import { ApartmentGuestsVO } from '@domain-value-objects/apartment-guests.value-object';
import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ShortTermRentPaymentTypeVO } from '@domain-value-objects/short-term-rent-payment-type.value-object';
import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { RentPeriodType } from '@domains/apartment-ad/domain/types';
import { LongTermRentIsRentedProblem } from '@domains/apartment-ad/problems/long-term-rent-is-rented.problem';
import { ChosenDatesIsNotAvailableProblem } from '@domains/contract-request/problems/chosen-dates-is-not-available.problem';
import { ReduceTheNumberOfGuestsProblem } from '@domains/contract-request/problems/reduce-the-number-of-guests.problem';
import { SpecifyPaymentMethodProblem } from '@domains/contract-request/problems/specify-payment-method.problem';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { CreateInstantContractCommand } from '@domains/contract/commands/create-instant-booking-contract/create-instant-booking-contract.command';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType, ShortTermRentBookingType } from '@infrastructure/enums';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ArgumentInvalidException, ExceptionBase } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { BookingRequestSentEvent } from '@modules/notifications/services/booking-request-sent/booking-request-sent.event';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { ContractRequestRepository } from 'src/rental-context/domain-repositories/contract-request/contract-request.repository';
import { ContractRequestEntity } from 'src/rental-context/domains/contract-request/domain/entities/contract-request.entity';
import { ContractRequestStatus } from 'src/rental-context/domains/contract-request/domain/types';
import { ContractRequestStatusVO } from 'src/rental-context/domains/contract-request/domain/value-objects/request-status.value-object';
import { ContractRequestAlreadyExistsProblem } from 'src/rental-context/domains/contract-request/problems/contract-request-already-exists.problem';

import { SendRequest } from './send-request.request.dto';

@Injectable()
export class SendRequestService {
  constructor(
    private readonly contractRequestRepository: ContractRequestRepository,
    private readonly contractRepository: ContractRepository,
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly rentPeriodVersionRepository: RentPeriodVersionRepository,
    private readonly contractOfferQueue: ContractOfferQueue,
    private commandBus: CommandBus,
    private readonly unitOfWork: UnitOfWork,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async handle(
    tenantId: UUID,
    dto: SendRequest,
  ): Promise<Result<UUID, LocalizedProblem | ExceptionBase | HttpException>> {
    const {
      apartmentAdId,
      arrivalDate,
      departureDate,
      apartmentRentPeriodType,
      guests,
      comment,
      rentBookingType,
      cardId,
      rentPaymentType,
    } = dto;

    const isLongTermArgumentValid =
      apartmentRentPeriodType === ApartmentRentPeriodType.LONG_TERM &&
      !arrivalDate &&
      !departureDate &&
      !rentBookingType &&
      !comment &&
      !rentPaymentType;

    const isShortTermArgumentValid =
      apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM &&
      !!arrivalDate &&
      !!departureDate &&
      !!rentBookingType &&
      !!rentPaymentType;

    if (!isLongTermArgumentValid && !isShortTermArgumentValid) {
      return Err(new ArgumentInvalidException(`Invalid arguments for ${apartmentRentPeriodType} rent period type`));
    }

    const trxId = await this.unitOfWork.start();

    try {
      const foundApartmentAd = await this.apartmentAdRepository.findWithAvailable(
        apartmentAdId,
        apartmentRentPeriodType,
        arrivalDate, // this date not in utc
        departureDate, // this date not in utc
        trxId,
      );

      if (!foundApartmentAd || !foundApartmentAd.isRentPublished(apartmentRentPeriodType)) {
        await this.unitOfWork.rollback(trxId);
        return Err(new ChosenDatesIsNotAvailableProblem());
      }

      if (!foundApartmentAd.isGuestsValid(guests)) {
        await this.unitOfWork.rollback(trxId);

        return Err(new ReduceTheNumberOfGuestsProblem(foundApartmentAd.numberOfGuests));
      }

      if (rentBookingType && foundApartmentAd.rentBookingType !== rentBookingType) {
        await this.unitOfWork.rollback(trxId);
        return Err(
          new ArgumentInvalidException(`Rent booking type ${rentBookingType} not available for this apartment ad`),
        );
      }

      const contractUTCDates = isShortTermArgumentValid
        ? this.getContractUTCDates(foundApartmentAd, arrivalDate, departureDate)
        : undefined;

      const [contractRequestExist, apartmentIsFree, lastRentPeriodVersion] = await Promise.all([
        this.contractRequestRepository.checkExist(
          {
            tenantId: tenantId.value,
            apartmentAdId: apartmentAdId,
            arrivalDate: contractUTCDates?.arrivalDateUTC.value,
            departureDate: contractUTCDates?.departureDateUTC.value,
            apartmentRentPeriodType,
          },
          trxId,
        ),
        this.contractRequestRepository.checkApartmentIsFree({
          apartmentAdId,
          apartmentRentPeriodType,
          from: contractUTCDates?.arrivalDateUTC.value,
          to: contractUTCDates?.departureDateUTC.value,
          trxId,
        }),
        this.rentPeriodVersionRepository.findLast(trxId),
      ]);

      if (contractRequestExist) {
        await this.unitOfWork.rollback(trxId);
        return Err(new ContractRequestAlreadyExistsProblem());
      }

      if (!apartmentIsFree) {
        await this.unitOfWork.rollback(trxId);
        if (foundApartmentAd.rentPeriodType.value === RentPeriodType.LONG_TERM) {
          return Err(new LongTermRentIsRentedProblem());
        }
        return Err(new ChosenDatesIsNotAvailableProblem());
      }

      if (!lastRentPeriodVersion) {
        await this.unitOfWork.rollback(trxId);
        return Err(new NotFoundException('Rent period version not found'));
      }

      const contractRequestStatus =
        rentBookingType === ShortTermRentBookingType.INSTANT
          ? ContractRequestStatus.ACCEPTED
          : ContractRequestStatus.CREATED;

      const contractRequest = ContractRequestEntity.create({
        apartmentRentPeriodType,
        status: ContractRequestStatusVO.create(contractRequestStatus),
        apartmentAdId: new UUID(apartmentAdId),
        arrivalDate: contractUTCDates?.arrivalDateUTC,
        departureDate: contractUTCDates?.departureDateUTC,
        tenantId,
        landlordId: foundApartmentAd.landlordId,
        guests: ApartmentGuestsVO.create(guests),
        comment: isShortTermArgumentValid ? comment : undefined,
        rentPeriodVersion: lastRentPeriodVersion,
        shortTermRentBookingType: rentBookingType ? ShortTermRentBookingTypeVO.create(rentBookingType) : undefined,
        shortTermRentPaymentType: rentPaymentType ? ShortTermRentPaymentTypeVO.create(rentPaymentType) : undefined,
      });

      const result = await this.contractRequestRepository.save(contractRequest, trxId);

      let contract: ContractEntity | undefined;
      if (rentBookingType === ShortTermRentBookingType.INSTANT) {
        if (!cardId) {
          await this.unitOfWork.rollback(trxId);

          return Err(new SpecifyPaymentMethodProblem());
        }

        contract = await this.instantBooking(contractRequest, new UUID(cardId), trxId);
      }

      await this.unitOfWork.commit(trxId);

      if (
        (rentBookingType === ShortTermRentBookingType.REQUEST && isShortTermArgumentValid) ||
        isLongTermArgumentValid
      ) {
        this.eventEmitter.emit(
          BookingRequestSentEvent.eventName,
          BookingRequestSentEvent.create({ recipientId: foundApartmentAd.landlordId }),
        );
      }

      if (contract) {
        this.contractOfferQueue.addInstantBookingJob({ contractId: contract.id.value });
      }

      return Ok(result);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      throw error;
    }
  }

  // for short term rent only
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

  private async instantBooking(contractRequest: ContractRequestEntity, cardId: UUID, trxId: TransactionId) {
    const [contractId] = await this.commandBus.execute<CreateInstantContractCommand, [contractId: UUID, chatId: UUID]>(
      new CreateInstantContractCommand(contractRequest, cardId, trxId),
    );

    const contract = await this.contractRepository.findOneById(contractId.value, trxId);
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    contract.setPending();

    await this.contractRepository.save(contract, trxId);

    return contract;
  }
}
