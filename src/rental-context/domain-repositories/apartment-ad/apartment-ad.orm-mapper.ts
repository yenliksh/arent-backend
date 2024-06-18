import { AddressVO } from '@domain-value-objects/address.value-object';
import { ApartmentAdCharacteristicsVO } from '@domain-value-objects/apartment-characteristics.value-object';
import { ApartmentRulesVO } from '@domain-value-objects/apartment-rules.value-object';
import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { DocumentsVO } from '@domain-value-objects/documents.value-object';
import { PaymentMethodVO } from '@domain-value-objects/payment-method.value-object';
import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ApartmentAdProps } from '@domains/apartment-ad/domain/entities/apartment-ad.types';
import { LongTermRentEntity } from '@domains/apartment-ad/domain/entities/long-term-rent.entity';
import { ShortTermRentLockedDateEntity } from '@domains/apartment-ad/domain/entities/short-term-rent-locked-date.entity';
import { ShortTermRentEntity } from '@domains/apartment-ad/domain/entities/short-term-rent.entity';
import { ApartmentAdDescriptionVO } from '@domains/apartment-ad/domain/value-objects/apartment-ad-description.value-object';
import { ApartmentAdDetailsVO } from '@domains/apartment-ad/domain/value-objects/apartment-ad-details.value-object';
import { ApartmentAdStatusVO } from '@domains/apartment-ad/domain/value-objects/apartment-ad-status.value-object';
import { ApartmentCategoryVO } from '@domains/apartment-ad/domain/value-objects/apartment-category.value-objects';
import { ApartmentTypeVO } from '@domains/apartment-ad/domain/value-objects/apartment-type.value-object';
import { ArrivalAndDepartureTimeVO } from '@domains/apartment-ad/domain/value-objects/arrival-and-departure-time.value-object';
import { BookingAccessInMonthVO } from '@domains/apartment-ad/domain/value-objects/booking-access-in-month.value-object';
import { LegalCapacityVO } from '@domains/apartment-ad/domain/value-objects/legal-capacity.value-object';
import { LongTermRentCancellationPolicyVO } from '@domains/apartment-ad/domain/value-objects/long-term-rent-cancellation-policy.value-object';
import { MediaVO } from '@domains/apartment-ad/domain/value-objects/media.value-object';
import { RentPeriodTypeVO } from '@domains/apartment-ad/domain/value-objects/rent-period-type.value-object';
import { ShortTermRentCancellationPolicyVO } from '@domains/apartment-ad/domain/value-objects/short-term-rent-cancellation-policy.value-object';
import { IdentityStatusType } from '@domains/user/domain/types';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType, ContractStatus } from '@infrastructure/enums';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { DateISOVO } from '@libs/ddd/domain/value-objects/iso-date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';

export class ApartmentAdOrmMapper extends OrmMapper<ApartmentAdEntity, ApartmentAdOrmEntity> {
  protected async toOrmProps(entity: ApartmentAdEntity): Promise<OrmEntityProps<ApartmentAdOrmEntity>> {
    const props = entity.getPropsCopy();

    const shortTermRentProps = props.shortTermRent ? props.shortTermRent.getPropsCopy() : props.shortTermRent;

    const shortTermRent: ShortTermRentOrmEntity | undefined | null = shortTermRentProps
      ? ShortTermRentOrmEntity.create({
          id: shortTermRentProps.id.value,
          apartmentAdId: entity.id.value,
          cost: shortTermRentProps.costAndCurrency.cost,
          currency: shortTermRentProps.costAndCurrency.currency,
          rentBookingType: shortTermRentProps.rentBookingType.value,
          cancellationPolicy: shortTermRentProps.cancellationPolicy?.value,
          arrivalTime: shortTermRentProps.arrivalAndDepartureTime?.arrivalTime,
          departureTime: shortTermRentProps.arrivalAndDepartureTime?.departureTime,
          status: shortTermRentProps.status.statusType,
          declineReason: shortTermRentProps.status.declineReason,
          bookingAccessInMonths: shortTermRentProps.bookingAccessInMonths?.value,
          lockedDates:
            shortTermRentProps.lockedDates?.map((i) => {
              const { startDate, shortTermRentId, endDate, id, createdAt, updatedAt, deletedAt } = i.values();

              return ShortTermRentLockedDateOrmEntity.create({
                id: id.value,
                startDate: startDate.value,
                endDate: endDate.value,
                shortTermRentId: shortTermRentId.value,
                createdAt: createdAt.value,
                updatedAt: updatedAt.value,
                deletedAt: deletedAt?.value,
              });
            }) || [],
          isApproved: shortTermRentProps.isApproved,
          createdAt: shortTermRentProps.createdAt.value,
          updatedAt: shortTermRentProps.updatedAt.value,
          deletedAt: shortTermRentProps.deletedAt?.value,
        })
      : shortTermRentProps;

    const longTermRentProps = props.longTermRent ? props.longTermRent.getPropsCopy() : props.longTermRent;
    const longTermRent: LongTermRentOrmEntity | undefined | null = longTermRentProps
      ? LongTermRentOrmEntity.create({
          id: longTermRentProps.id.value,
          apartmentAdId: entity.id.value,
          cost: longTermRentProps.costAndCurrency.cost,
          currency: longTermRentProps.costAndCurrency.currency,
          status: longTermRentProps.status.statusType,
          cancellationPolicy: longTermRentProps.cancellationPolicy?.value,
          declineReason: longTermRentProps.status.declineReason,
          isApproved: longTermRentProps.isApproved,
          ownershipDocuments: longTermRentProps.ownershipDocuments?.fileKeys,
          createdAt: longTermRentProps.createdAt.value,
          updatedAt: longTermRentProps.updatedAt.value,
          deletedAt: longTermRentProps.deletedAt?.value,
        })
      : longTermRentProps;

    const detailsProps = props.details?.unpack();
    const details = detailsProps
      ? { numberOfGuests: detailsProps.numberOfGuests, numberOfRooms: detailsProps.numberOfRooms }
      : {};

    const addressProps = props.address?.unpack();
    const address = addressProps
      ? {
          country: addressProps.country,
          city: addressProps.city,
          region: addressProps.region,
          street: addressProps.street,
          houseNumber: addressProps.houseNumber,
          lat: addressProps.geoPoint.lat,
          lng: addressProps.geoPoint.lng,
          timezone: addressProps.timezone,
        }
      : {};

    const media = props.media?.unpack();

    const description = props.description?.unpack();

    const rules = props.rules?.unpack();

    const characteristics = props.characteristics?.unpack();

    const legalCapacityProps = props.legalCapacity.unpack();
    const legalCapacity: Pick<
      OrmEntityProps<ApartmentAdOrmEntity>,
      'legalCapacityType' | 'legalCapacityTinBin' | 'legalCapacityCompanyName' | 'legalCapacityAddress'
    > = {
      legalCapacityType: legalCapacityProps.type,
      legalCapacityTinBin: legalCapacityProps.tinBin,
      legalCapacityCompanyName: legalCapacityProps.companyName,
      legalCapacityAddress: legalCapacityProps.address,
    };

    const paymentMethodProps = props.paymentMethod?.unpack();
    const paymentMethod: Pick<OrmEntityProps<ApartmentAdOrmEntity>, 'defaultPaymentMethod' | 'innopayCardId'> = {
      defaultPaymentMethod: paymentMethodProps?.defaultType,
      innopayCardId: paymentMethodProps?.innopayCardId,
    };

    const ormProps: OrmEntityProps<ApartmentAdOrmEntity> = {
      landlordId: props.landlordId.value,
      rentPeriodType: props.rentPeriodType.value,
      apartmentType: props.apartmentType.value,
      apartmentCategory: props.apartmentCategory.value,
      completeStep: props.completeStep,
      longTermRent,
      shortTermRent,
      media,
      description,
      rules,
      characteristics,
      ...details,
      ...address,
      ...legalCapacity,
      ...paymentMethod,
    };

    return ormProps;
  }

  protected async toDomainProps(
    ormEntity: ApartmentAdOrmEntity,
    trxId?: TransactionId,
  ): Promise<EntityProps<ApartmentAdProps>> {
    const id = new UUID(ormEntity.id);
    const landlordId = new UUID(ormEntity.landlordId);

    const trx = trxId ? this.unitOfWork?.getTrx(trxId) : undefined;

    const concludedLongTermRentContractQuery = ContractOrmEntity.query(trx).findOne({
      apartmentAdId: ormEntity.id,
      status: ContractStatus.CONCLUDED,
      apartmentRentPeriodType: ApartmentRentPeriodType.LONG_TERM,
    });

    const lockedDatesQuery = ormEntity.shortTermRent?.id
      ? ShortTermRentLockedDateOrmEntity.query(trx).where('shortTermRentId', ormEntity.shortTermRent.id)
      : ([] as ShortTermRentLockedDateOrmEntity[]);

    const landlordQuery = ormEntity.landlordId ? UserOrmEntity.query(trx).findById(ormEntity.landlordId) : undefined;

    const [concludedLongTermRentContract, lockedDates, landlord] = await Promise.all([
      concludedLongTermRentContractQuery,
      lockedDatesQuery,
      landlordQuery,
    ]);

    const isUserIdentityApproved = landlord ? landlord.identityStatus === IdentityStatusType.APPROVED : false;

    const shortTermRent: ShortTermRentEntity | undefined = ormEntity.shortTermRent
      ? new ShortTermRentEntity({
          id: new UUID(ormEntity.shortTermRent.id),
          props: {
            apartmentAdId: id,
            costAndCurrency: CostAndCurrencyVO.create({
              cost: ormEntity.shortTermRent.cost,
            }),
            isApproved: ormEntity.shortTermRent.isApproved,
            status: ApartmentAdStatusVO.create({
              statusType: ormEntity.shortTermRent.status,
              declineReason: ormEntity.shortTermRent.declineReason,
            }),
            rentBookingType: ShortTermRentBookingTypeVO.create(ormEntity.shortTermRent.rentBookingType),
            bookingAccessInMonths:
              ormEntity.shortTermRent.bookingAccessInMonths != null
                ? new BookingAccessInMonthVO({ value: ormEntity.shortTermRent.bookingAccessInMonths })
                : ormEntity.shortTermRent.bookingAccessInMonths,
            lockedDates: lockedDates.map(
              ({ id, shortTermRentId, startDate, endDate, createdAt, updatedAt, deletedAt }) =>
                new ShortTermRentLockedDateEntity({
                  id: new UUID(id),
                  props: {
                    startDate: new DateISOVO(startDate),
                    endDate: new DateISOVO(endDate),
                    shortTermRentId: new UUID(shortTermRentId),
                  },
                  createdAt: new DateVO(createdAt),
                  updatedAt: new DateVO(updatedAt),
                  deletedAt: deletedAt ? new DateVO(deletedAt) : null,
                }),
            ),
            arrivalAndDepartureTime:
              ormEntity.shortTermRent.arrivalTime && ormEntity.shortTermRent.departureTime
                ? ArrivalAndDepartureTimeVO.create({
                    arrivalTime: ormEntity.shortTermRent.arrivalTime,
                    departureTime: ormEntity.shortTermRent.departureTime,
                  })
                : undefined,
            cancellationPolicy: ormEntity.shortTermRent.cancellationPolicy
              ? ShortTermRentCancellationPolicyVO.create(ormEntity.shortTermRent.cancellationPolicy)
              : undefined,
          },
          createdAt: new DateVO(ormEntity.shortTermRent.createdAt),
          updatedAt: new DateVO(ormEntity.shortTermRent.updatedAt),
          deletedAt: ormEntity.shortTermRent.deletedAt ? new DateVO(ormEntity.shortTermRent.deletedAt) : null,
        })
      : undefined;

    const longTermRent: LongTermRentEntity | undefined = ormEntity.longTermRent
      ? new LongTermRentEntity({
          id: new UUID(ormEntity.longTermRent.id),
          props: {
            apartmentAdId: id,
            isApproved: ormEntity.longTermRent.isApproved,
            costAndCurrency: CostAndCurrencyVO.create({
              cost: ormEntity.longTermRent.cost,
            }),
            status: ApartmentAdStatusVO.create({
              statusType: ormEntity.longTermRent.status,
              declineReason: ormEntity.longTermRent.declineReason,
            }),
            cancellationPolicy: ormEntity.longTermRent.cancellationPolicy
              ? LongTermRentCancellationPolicyVO.create(ormEntity.longTermRent.cancellationPolicy)
              : undefined,
            ownershipDocuments: ormEntity.longTermRent.ownershipDocuments
              ? new DocumentsVO({ fileKeys: ormEntity.longTermRent.ownershipDocuments })
              : undefined,
          },
          createdAt: new DateVO(ormEntity.longTermRent.createdAt),
          updatedAt: new DateVO(ormEntity.longTermRent.updatedAt),
          deletedAt: ormEntity.longTermRent.deletedAt ? new DateVO(ormEntity.longTermRent.deletedAt) : null,
        })
      : undefined;

    const details: ApartmentAdDetailsVO | undefined =
      ormEntity.numberOfGuests != null && ormEntity.numberOfRooms != null
        ? ApartmentAdDetailsVO.create({
            numberOfGuests: ormEntity.numberOfGuests,
            numberOfRooms: ormEntity.numberOfRooms,
          })
        : undefined;

    const addressProps = AddressVO.isNotEmpty({
      country: ormEntity.country,
      city: ormEntity.city,
      region: ormEntity.region,
      street: ormEntity.street,
      houseNumber: ormEntity.houseNumber,
      geoPoint: {
        lat: ormEntity.lat,
        lng: ormEntity.lng,
      },
      timezone: ormEntity.timezone,
    });
    const address = addressProps ? AddressVO.create(addressProps) : undefined;

    const media = ormEntity?.media ? new MediaVO(ormEntity.media) : undefined;

    const description = ormEntity?.description ? ApartmentAdDescriptionVO.create(ormEntity.description) : undefined;

    const rules = ormEntity?.rules ? ApartmentRulesVO.create(ormEntity?.rules) : undefined;

    const characteristics = ormEntity?.characteristics
      ? ApartmentAdCharacteristicsVO.create(ormEntity?.characteristics)
      : undefined;

    const paymentMethod =
      ormEntity?.defaultPaymentMethod && ormEntity?.innopayCardId
        ? new PaymentMethodVO({ defaultType: ormEntity.defaultPaymentMethod, innopayCardId: ormEntity.innopayCardId })
        : undefined;

    const props: ApartmentAdProps = {
      landlordId,
      completeStep: ormEntity.completeStep,
      legalCapacity: LegalCapacityVO.create({
        type: ormEntity.legalCapacityType,
        tinBin: ormEntity.legalCapacityTinBin,
        companyName: ormEntity.legalCapacityCompanyName,
        address: ormEntity.legalCapacityAddress,
      }),
      rentPeriodType: RentPeriodTypeVO.create(ormEntity.rentPeriodType),
      apartmentCategory: ApartmentCategoryVO.create(ormEntity.apartmentCategory),
      apartmentType: ApartmentTypeVO.create(ormEntity.apartmentType),
      shortTermRent,
      longTermRent,
      details,
      address,
      media,
      description,
      rules,
      characteristics,
      paymentMethod,
      longTermRentAdIsRented: !!concludedLongTermRentContract,
      isUserIdentityApproved,
    };

    return { id, props };
  }
}
