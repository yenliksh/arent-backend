import { ApartmentGuestsVO } from '@domain-value-objects/apartment-guests.value-object';
import { ApartmentRulesVO } from '@domain-value-objects/apartment-rules.value-object';
import { CancellationPolicyVO } from '@domain-value-objects/cancellation-policy.value-object';
import { ContractStatusVO } from '@domain-value-objects/contract-status.value-object';
import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ShortTermRentPaymentTypeVO } from '@domain-value-objects/short-term-rent-payment-type.value-object';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { BaseContractApartmentAdDataVO } from '@domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object';
import { ContractDetailsVO } from '@domains/contract/domain/value-objects/contract-details.value-object';
import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import {
  ApartmentRentPeriodType,
  ContractStatus,
  LongTermRentCancellationPolicyType,
  ShortTermRentBookingType,
  ShortTermRentCancellationPolicyType,
  ShortTermRentPaymentType,
} from '@infrastructure/enums';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { DateUtil } from '@libs/utils/date-util';

export interface IContractCreateProps {
  arrivalDate: string;
  departureDate: string;
  cost: number;
  rentType: ApartmentRentPeriodType;
  shortTermRentPaymentTypeInput?: ShortTermRentPaymentType;
  shortTermRentCancelationPolicyType?: ShortTermRentCancellationPolicyType;
  withFine?: boolean;
}

export const contractRentalStrategyFactory = ({
  arrivalDate = '2022-10-20T16:00:00.000Z',
  departureDate = '2022-10-25T14:00:00.000Z',
  cost = 5000000,
  rentType = ApartmentRentPeriodType.SHORT_TERM,
  shortTermRentPaymentTypeInput = ShortTermRentPaymentType.FULL,
  shortTermRentCancelationPolicyType = ShortTermRentCancellationPolicyType.FLEXIBLE,
  withFine = false,
}: IContractCreateProps) => {
  const cancellationPolicy =
    rentType === ApartmentRentPeriodType.SHORT_TERM
      ? CancellationPolicyVO.create(rentType, {
          shortTermCancellationPolicy: shortTermRentCancelationPolicyType,
        })
      : CancellationPolicyVO.create(rentType, {
          longTermCancellationPolicy: LongTermRentCancellationPolicyType.FORFEIT,
        });

  const shortTermRentBookingType =
    rentType === ApartmentRentPeriodType.SHORT_TERM
      ? ShortTermRentBookingTypeVO.create(ShortTermRentBookingType.REQUEST)
      : undefined;

  const shortTermRentPaymentType =
    rentType === ApartmentRentPeriodType.SHORT_TERM
      ? ShortTermRentPaymentTypeVO.create(shortTermRentPaymentTypeInput ?? ShortTermRentPaymentType.FULL)
      : undefined;

  const contract = new ContractEntity({
    id: UUID.generate(),
    props: {
      contractRequestId: UUID.generate(),
      apartmentAdId: UUID.generate(),
      apartmentRentPeriodType: rentType,
      details: new ContractDetailsVO({
        arrivalDate: new DateTimeISOTZVO(DateUtil.parse(arrivalDate).toISOString()),
        departureDate: new DateTimeISOTZVO(DateUtil.parse(departureDate).toISOString()),
        rules: ApartmentRulesVO.create({
          allowedWithPets: true,
          allowedWithChildren: true,
          allowedToSmoke: true,
          allowedToHangingOut: true,
        }),
      }),
      isExistUnpaidTransactions: true,
      isPending: false,
      isFined: withFine,
      isTemporary: false,
      landlordId: UUID.generate(),
      status: ContractStatusVO.create(ContractStatus.CREATED),
      tenantId: UUID.generate(),
      costAndCurrency: CostAndCurrencyVO.create({ cost }),
      cancellationPolicy,
      shortTermRentBookingType,
      shortTermRentPaymentType,
      paymentData: null,
      baseContractApartmentAdData: new BaseContractApartmentAdDataVO({
        title: 'Cool apartment',
        address: {
          city: 'Алма-Ата',
          country: 'KZ',
          street: 'Веселая',
          houseNumber: '600',
          geoPoint: {
            lat: 43.2178,
            lng: 76.9022,
          },
        },
      }),
      guests: new ApartmentGuestsVO({
        numberOfAdult: 1,
        numberOfChildren: 0,
        numberOfPets: 2,
      }),
      rentPeriodVersion: new RentPeriodVersionEntity({
        id: UUID.generate(),
        props: {
          version: 1,
          shortTermRentMonth: [0, 1],
          middleTermRentMonth: [1, 3],
          longTermRentMonth: [11],
        },
        createdAt: DateVO.now(),
        updatedAt: DateVO.now(),
        deletedAt: undefined,
      }),
    },
    createdAt: DateVO.now(),
    updatedAt: DateVO.now(),
    deletedAt: undefined,
  });

  return contract;
};
