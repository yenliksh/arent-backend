import { ApartmentGuestsVO } from '@domain-value-objects/apartment-guests.value-object';
import { PaymentMethodVO } from '@domain-value-objects/payment-method.value-object';
import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ShortTermRentPaymentTypeVO } from '@domain-value-objects/short-term-rent-payment-type.value-object';
import { ContractCancelationEntity } from '@domains/contract/domain/entities/contract-cancelation.entity';
import { ContractEntity, ContractProps } from '@domains/contract/domain/entities/contract.entity';
import { BaseContractApartmentAdDataVO } from '@domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object';
import { ContractDetailsVO } from '@domains/contract/domain/value-objects/contract-details.value-object';
import { TemporaryPaymentDataVO } from '@domains/contract/domain/value-objects/temporary-payment-data.value-object';
import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { UrlVO } from '@domains/user/domain/value-objects';
import { ContractCancelationOrmEntity } from '@infrastructure/database/entities/contract-cancelation.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { RentPeriodVersionOrmEntity } from '@infrastructure/database/entities/rent-period-version.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
import { ArgumentInvalidException } from '@libs/exceptions';
import { Model } from 'objection';
import { ApartmentRulesVO } from 'src/rental-context/domain-value-objects/apartment-rules.value-object';
import { CancellationPolicyVO } from 'src/rental-context/domain-value-objects/cancellation-policy.value-object';
import { ContractStatusVO } from 'src/rental-context/domain-value-objects/contract-status.value-object';
import { CostAndCurrencyVO } from 'src/rental-context/domain-value-objects/cost-and-currency.value-object';

export class ContractOrmMapper extends OrmMapper<ContractEntity, ContractOrmEntity> {
  protected async toOrmProps(entity: ContractEntity): Promise<OrmEntityProps<ContractOrmEntity>> {
    const props = entity.getPropsCopy();
    const cancelationProps = props.contractCancelation?.getPropsCopy();

    const ormProps: OrmEntityProps<ContractOrmEntity> = {
      contractRequestId: props.contractRequestId ? props.contractRequestId.value : undefined,
      apartmentAdId: props.apartmentAdId ? props.apartmentAdId.value : undefined,
      apartmentRentPeriodType: props.apartmentRentPeriodType,
      status: props.status.value,
      tenantId: props.tenantId ? props.tenantId.value : undefined,
      landlordId: props.landlordId ? props.landlordId.value : undefined,
      cost: props.costAndCurrency.cost,
      currency: props.costAndCurrency.currency,
      arrivalDate: props.details.arrivalDate ? new Date(props.details.arrivalDate.value) : undefined,
      departureDate: props.details.departureDate ? new Date(props.details.departureDate.value) : undefined,
      rules: props.details.rules?.unpack(),
      rentPeriodVersionId: props.rentPeriodVersion.id.value,
      shortTermCancellationPolicy: props.cancellationPolicy.shortTermCancellationPolicy,
      longTermCancellationPolicy: props.cancellationPolicy.longTermCancellationPolicy,
      isPending: props.isPending,
      isFined: props.isFined,
      isTemporary: props.isTemporary,
      defaultPaymentMethod: props.tenantPaymentMethod?.defaultType ?? null,
      tenantInnopayCardId: props.tenantPaymentMethod?.innopayCardId ?? null,
      rentBookingType: props.shortTermRentBookingType?.value,
      rentPaymentType: props.shortTermRentPaymentType?.value,
      baseApartmentAdData: props.baseContractApartmentAdData.unpack(),
      guests: props.guests.unpack(),
      nextPaymentTransactionId: props.nextPaymentTransactionId?.value,
      paymentUrl: props.paymentData?.paymentUrl ?? null,
      paymentUrlStartAt: props.paymentData?.paymentUrlStartAt ? new Date(props.paymentData?.paymentUrlStartAt) : null,
      customerReference: props.paymentData?.customerReference ?? null,
      contractCancelation: cancelationProps
        ? ContractCancelationOrmEntity.create({
            id: cancelationProps.id.value,
            cancelationDate: cancelationProps.cancelationDate.value,
            checkOutDate: cancelationProps.checkOutDate.value,
            contractId: cancelationProps.contractId.value,
            triggerUserId: cancelationProps.triggerUserId?.value,
            refundsAmountToSenderCost: cancelationProps.refundsAmountToSender.cost,
            refundsAmountToSenderCurrency: cancelationProps.refundsAmountToSender.currency,
            transferAmountToPlatformCost: cancelationProps.transferAmountToPlatform.cost,
            transferAmountToPlatformCurrency: cancelationProps.transferAmountToPlatform.currency,
            transferAmountToRecipientCost: cancelationProps.transferAmountToRecipient.cost,
            transferAmountToRecipientCurrency: cancelationProps.transferAmountToRecipient.currency,
            withdrawalAmountFromSenderCost: cancelationProps.withdrawalAmountFromSender.cost,
            withdrawalAmountFromSenderCurrency: cancelationProps.withdrawalAmountFromSender.currency,
            withdrawalAmountFromRecipientCost: cancelationProps.withdrawalAmountFromRecipient.cost,
            withdrawalAmountFromRecipientCurrency: cancelationProps.withdrawalAmountFromRecipient.currency,
            isFine: cancelationProps.isFine,
            createdAt: cancelationProps.createdAt.value,
            updatedAt: cancelationProps.updatedAt.value,
            deletedAt: cancelationProps.deletedAt?.value,
          })
        : undefined,
    };

    return ormProps;
  }

  protected async toDomainProps(
    ormEntity: ContractOrmEntity,
    trxId?: TransactionId,
  ): Promise<EntityProps<ContractProps>> {
    const id = new UUID(ormEntity.id);

    const trx = trxId ? this.unitOfWork?.getTrx(trxId) : undefined;

    const { arrivalDate, departureDate, rules } = ormEntity;

    const rentPeriodVersionQuery = RentPeriodVersionOrmEntity.query(trx).findById(ormEntity.rentPeriodVersionId);

    PaymentTransactionOrmEntity.knexQuery().select();

    const existUnpaidTransactionsQuery = PaymentTransactionOrmEntity.query()
      .select(
        Model.raw(
          `exists(select * from payment_transactions where "contractId" = ? and status = ANY(ARRAY['CASH_OUT_WAITING'::text, 'CASH_IN_WAITING'::text]))`,
          [ormEntity.id],
        ),
      )
      .first();

    const [rentPeriodVersion, existUnpaidTransactions] = await Promise.all([
      rentPeriodVersionQuery,
      existUnpaidTransactionsQuery as unknown as Promise<{ exists: boolean } | undefined>,
    ]);

    if (!rentPeriodVersion) {
      throw new ArgumentInvalidException('Rent period version required');
    }

    const props: ContractProps = {
      contractRequestId: ormEntity.contractRequestId ? new UUID(ormEntity.contractRequestId) : undefined,
      apartmentAdId: ormEntity.apartmentAdId ? new UUID(ormEntity.apartmentAdId) : undefined,
      apartmentRentPeriodType: ormEntity.apartmentRentPeriodType,
      details: new ContractDetailsVO({
        arrivalDate: arrivalDate ? new DateTimeISOTZVO(arrivalDate.toISOString()) : undefined,
        departureDate: departureDate ? new DateTimeISOTZVO(departureDate.toISOString()) : undefined,
        rules: rules ? ApartmentRulesVO.create(rules) : undefined,
      }),
      landlordId: ormEntity.landlordId ? new UUID(ormEntity.landlordId) : undefined,
      status: ContractStatusVO.create(ormEntity.status),
      tenantId: ormEntity.tenantId ? new UUID(ormEntity.tenantId) : undefined,
      costAndCurrency: CostAndCurrencyVO.create({ cost: ormEntity.cost }),
      cancellationPolicy: CancellationPolicyVO.create(ormEntity.apartmentRentPeriodType, {
        shortTermCancellationPolicy: ormEntity.shortTermCancellationPolicy,
        longTermCancellationPolicy: ormEntity.longTermCancellationPolicy,
      }),
      isFined: ormEntity.isFined,
      isPending: ormEntity.isPending,
      isTemporary: ormEntity.isTemporary,
      tenantPaymentMethod:
        ormEntity.defaultPaymentMethod && ormEntity.tenantInnopayCardId
          ? new PaymentMethodVO({
              defaultType: ormEntity.defaultPaymentMethod,
              innopayCardId: ormEntity.tenantInnopayCardId,
            })
          : undefined,
      shortTermRentBookingType: ormEntity.rentBookingType
        ? ShortTermRentBookingTypeVO.create(ormEntity.rentBookingType)
        : undefined,
      shortTermRentPaymentType: ormEntity.rentPaymentType
        ? ShortTermRentPaymentTypeVO.create(ormEntity.rentPaymentType)
        : undefined,
      baseContractApartmentAdData: new BaseContractApartmentAdDataVO(ormEntity.baseApartmentAdData),
      guests: new ApartmentGuestsVO(ormEntity.guests),
      rentPeriodVersion: new RentPeriodVersionEntity({
        id: new UUID(rentPeriodVersion.id),
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
      nextPaymentTransactionId: ormEntity.nextPaymentTransactionId
        ? new UUID(ormEntity.nextPaymentTransactionId)
        : undefined,
      paymentData:
        ormEntity.paymentUrl && ormEntity.paymentUrlStartAt && ormEntity.customerReference
          ? new TemporaryPaymentDataVO({
              customerReference: ormEntity.customerReference,
              paymentUrl: new UrlVO(ormEntity.paymentUrl),
              paymentUrlStartAt: ormEntity.paymentUrlStartAt,
            })
          : null,
      contractCancelation: ormEntity.contractCancelation
        ? new ContractCancelationEntity({
            id: new UUID(ormEntity.contractCancelation.id),
            props: {
              contractId: new UUID(ormEntity.id),
              triggerUserId: ormEntity.contractCancelation.triggerUserId
                ? new UUID(ormEntity.contractCancelation.triggerUserId)
                : undefined,
              cancelationDate: new DateTimeISOTZVO(ormEntity.contractCancelation.cancelationDate),
              checkOutDate: new DateTimeISOTZVO(ormEntity.contractCancelation.checkOutDate),
              refundsAmountToSender: CostAndCurrencyVO.create({
                cost: ormEntity.contractCancelation.refundsAmountToSenderCost,
                currency: ormEntity.contractCancelation.refundsAmountToSenderCurrency,
              }),
              transferAmountToPlatform: CostAndCurrencyVO.create({
                cost: ormEntity.contractCancelation.transferAmountToPlatformCost,
                currency: ormEntity.contractCancelation.transferAmountToPlatformCurrency,
              }),
              transferAmountToRecipient: CostAndCurrencyVO.create({
                cost: ormEntity.contractCancelation.transferAmountToRecipientCost,
                currency: ormEntity.contractCancelation.transferAmountToRecipientCurrency,
              }),
              withdrawalAmountFromSender: CostAndCurrencyVO.create({
                cost: ormEntity.contractCancelation.withdrawalAmountFromSenderCost,
                currency: ormEntity.contractCancelation.withdrawalAmountFromSenderCurrency,
              }),
              withdrawalAmountFromRecipient: CostAndCurrencyVO.create({
                cost: ormEntity.contractCancelation.withdrawalAmountFromRecipientCost,
                currency: ormEntity.contractCancelation.withdrawalAmountFromRecipientCurrency,
              }),
              isFine: ormEntity.contractCancelation.isFine,
            },
            createdAt: new DateVO(ormEntity.contractCancelation.createdAt),
            updatedAt: new DateVO(ormEntity.contractCancelation.updatedAt),
            deletedAt: ormEntity.contractCancelation.deletedAt
              ? new DateVO(ormEntity.contractCancelation.deletedAt)
              : null,
          })
        : undefined,
      isExistUnpaidTransactions: existUnpaidTransactions?.exists != null ? existUnpaidTransactions.exists : false,
    };

    return { id, props };
  }
}
