import { ApartmentGuestsVO } from '@domain-value-objects/apartment-guests.value-object';
import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ShortTermRentPaymentTypeVO } from '@domain-value-objects/short-term-rent-payment-type.value-object';
import {
  ContractRequestEntity,
  ContractRequestProps,
} from '@domains/contract-request/domain/entities/contract-request.entity';
import { ContractRequestStatusVO } from '@domains/contract-request/domain/value-objects/request-status.value-object';
import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { RentPeriodVersionOrmEntity } from '@infrastructure/database/entities/rent-period-version.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
import { NotFoundException } from '@nestjs/common';

export class ContractRequestOrmMapper extends OrmMapper<ContractRequestEntity, ContractRequestOrmEntity> {
  protected async toOrmProps(entity: ContractRequestEntity): Promise<OrmEntityProps<ContractRequestOrmEntity>> {
    const props = entity.getPropsCopy();
    const guests = props.guests?.unpack();

    const ormProps: OrmEntityProps<ContractRequestOrmEntity> = {
      apartmentAdId: props.apartmentAdId ? props.apartmentAdId.value : undefined,
      apartmentRentPeriodType: props.apartmentRentPeriodType,
      status: props.status.value,
      tenantId: props.tenantId ? props.tenantId.value : undefined,
      arrivalDate: props.arrivalDate ? new Date(props.arrivalDate.value) : undefined,
      departureDate: props.departureDate ? new Date(props.departureDate.value) : undefined,
      comment: props.comment,
      guests,
      rejectReason: props.rejectReason,
      rentPeriodVersionId: props.rentPeriodVersion.id.value,
      rentBookingType: props.shortTermRentBookingType?.value,
      rentPaymentType: props.shortTermRentPaymentType?.value,
    };

    return ormProps;
  }

  protected async toDomainProps(
    ormEntity: ContractRequestOrmEntity,
    trxId?: TransactionId,
  ): Promise<EntityProps<ContractRequestProps>> {
    const id = new UUID(ormEntity.id);

    const trx = trxId ? this.unitOfWork?.getTrx(trxId) : undefined;

    const [rentPeriodVersion, apartmentAd] = await Promise.all([
      RentPeriodVersionOrmEntity.query(trx).findById(ormEntity.rentPeriodVersionId),
      ormEntity.apartmentAdId
        ? ApartmentAdOrmEntity.query(trx).findById(ormEntity.apartmentAdId).select('landlordId')
        : undefined,
    ]);

    if (!rentPeriodVersion) {
      throw new NotFoundException('Rent period version not found');
    }

    const props: ContractRequestProps = {
      apartmentAdId: ormEntity.apartmentAdId ? new UUID(ormEntity.apartmentAdId) : undefined,
      apartmentRentPeriodType: ormEntity.apartmentRentPeriodType,
      landlordId: apartmentAd?.landlordId ? new UUID(apartmentAd.landlordId) : undefined,
      status: ContractRequestStatusVO.create(ormEntity.status),
      tenantId: ormEntity.tenantId ? new UUID(ormEntity.tenantId) : undefined,
      arrivalDate: ormEntity.arrivalDate ? new DateTimeISOTZVO(ormEntity.arrivalDate.toISOString()) : undefined,
      departureDate: ormEntity.departureDate ? new DateTimeISOTZVO(ormEntity.departureDate.toISOString()) : undefined,
      comment: ormEntity.comment,
      rejectReason: ormEntity.rejectReason,
      shortTermRentBookingType: ormEntity.rentBookingType
        ? ShortTermRentBookingTypeVO.create(ormEntity.rentBookingType)
        : undefined,
      shortTermRentPaymentType: ormEntity.rentPaymentType
        ? ShortTermRentPaymentTypeVO.create(ormEntity.rentPaymentType)
        : undefined,
      guests: new ApartmentGuestsVO(ormEntity.guests),
      rentPeriodVersion: new RentPeriodVersionEntity({
        id: new UUID(ormEntity.rentPeriodVersionId),
        props: {
          version: rentPeriodVersion.version,
          shortTermRentMonth: rentPeriodVersion.shortTermRentMonth,
          middleTermRentMonth: rentPeriodVersion.middleTermRentMonth,
          longTermRentMonth: rentPeriodVersion.longTermRentMonth,
        },
        createdAt: new DateVO(rentPeriodVersion.createdAt),
        updatedAt: new DateVO(rentPeriodVersion.updatedAt),
        deletedAt: rentPeriodVersion.deletedAt ? new DateVO(rentPeriodVersion.deletedAt) : null,
      }),
    };

    return { id, props };
  }
}
