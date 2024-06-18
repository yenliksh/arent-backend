import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { LONG_TERM_RENT_ARRIVAL_TIME, LONG_TERM_RENT_DEPARTURE_TIME } from 'src/rental-context/constants';
import { ContractRepository } from 'src/rental-context/domain-repositories/contract/contract.repository';
import { ContractOfferAlreadyExistsProblem } from 'src/rental-context/domains/contract/problems/contract-offer-already-exists.problem';

import { SendContractOfferRequest } from './send-contract-offer.request.dto';

@Injectable()
export class SendContractOfferService {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly contractOfferQueue: ContractOfferQueue,
  ) {}

  async handle(
    dto: SendContractOfferRequest,
    userId: UUID,
  ): Promise<Result<UUID, NotFoundException | ArgumentInvalidException | ContractOfferAlreadyExistsProblem>> {
    const { chatId, arrivalDate, allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets } = dto;

    const contract = await this.contractRepository.findOneByLandlordAndChatId(chatId, userId.value);

    if (!contract) {
      return Err(new NotFoundException('Contract not found'));
    }

    const isLongTermArgumentValid =
      contract.apartmentRentPeriodType === ApartmentRentPeriodType.LONG_TERM && !!arrivalDate;

    const isShortTermArgumentValid =
      contract.apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM && !arrivalDate;

    if (!isLongTermArgumentValid && !isShortTermArgumentValid) {
      return Err(
        new ArgumentInvalidException(`Invalid arguments for ${contract.apartmentRentPeriodType} rent period type`),
      );
    }

    const apartmentAdId = contract.apartmentAdIdOrFail;

    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId.value);

    if (!apartmentAd) {
      throw new NotFoundException('Apartment ad not found');
    }

    // TODO: getContractUTCDates take arrivalTime and departureTime from short_term_rents
    // TODO: for long term rent should take time not from short_term_rents
    const contractUTCDates = isLongTermArgumentValid
      ? this.getContractUTCDates(
          apartmentAd.getTimezoneOrFail(),
          arrivalDate,
          DateUtil.add(arrivalDate, {
            value: contract.rentPeriodVersion.longTermRentMonth[0], // incomingDepartureDate is null if rent type is long term only
            unit: 'month',
          }).format('YYYY-MM-DD'),
        )
      : undefined;

    const arrivalDateUTC = contractUTCDates ? contractUTCDates.arrivalDateUTC : contract.arrivalDateOrFail;
    const departureDateUTC = contractUTCDates ? contractUTCDates.departureDateUTC : contract.departureDateOrFail;

    const isApartmentFree = await this.contractRepository.checkApartmentIsFree({
      apartmentAdId: apartmentAdId.value,
      apartmentRentPeriodType: contract.apartmentRentPeriodType,
      from: arrivalDateUTC,
      to: departureDateUTC,
    });
    if (!isApartmentFree) {
      return Err(new ContractOfferAlreadyExistsProblem());
    }

    contract.setDates({ arrivalDate: arrivalDateUTC, departureDate: departureDateUTC });

    contract.setPending();

    await this.contractRepository.save(contract);

    this.contractOfferQueue.addSendJob({
      chatId,
      landlordId: userId.value,
      allowedToHangingOut,
      allowedToSmoke,
      allowedWithChildren,
      allowedWithPets,
    });

    return Ok(contract.id);
  }

  // for long term rent only
  private getContractUTCDates(timezone: string, arrivalDate: string, departureDate: string) {
    const arrivalDateUTC = DateUtil.parseWithZone(
      `${arrivalDate} ${LONG_TERM_RENT_ARRIVAL_TIME}`,
      timezone,
      true,
    ).toISOString();

    const departureDateUTC = DateUtil.parseWithZone(
      `${departureDate} ${LONG_TERM_RENT_DEPARTURE_TIME}`,
      timezone,
      true,
    ).toISOString();

    return { arrivalDateUTC, departureDateUTC };
  }
}
