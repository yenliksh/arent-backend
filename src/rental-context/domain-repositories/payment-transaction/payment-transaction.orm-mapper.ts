import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { TaxVO } from '@domain-value-objects/tax.value-object';
import { InnopayCardEntity } from '@domains/innopay-card/domain/entities/innopay-card.entity';
import { InnopayAppointmentCardType } from '@domains/innopay-card/domain/types';
import { PanMaskedVO } from '@domains/innopay-card/domain/value-objects/pan-masked.value-object';
import { PaymentInvoiceEntity } from '@domains/payment-transaction/domain/entities/payment-invoice.entity';
import {
  PaymentTransactionEntity,
  PaymentTransactionProps,
} from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { CustomerReferenceVO } from '@domains/payment-transaction/domain/value-objects/customer-reference.value-object';
import { PaymentInvoiceStatusVO } from '@domains/payment-transaction/domain/value-objects/payment-invoice-status.value-object';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { PaymentInvoiceOrmEntity } from '@infrastructure/database/entities/payment-invoice.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
import { DateUtil } from '@libs/utils/date-util';
import { NotFoundException } from '@nestjs/common';

export class PaymentTransactionOrmMapper extends OrmMapper<PaymentTransactionEntity, PaymentTransactionOrmEntity> {
  protected async toOrmProps(entity: PaymentTransactionEntity): Promise<OrmEntityProps<PaymentTransactionOrmEntity>> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<PaymentTransactionOrmEntity> = {
      contractId: props.contractId.value,

      withdrawFundsDate: DateUtil.parseUTC(props.withdrawFundsDate.value).toDate(),
      totalAmountPayable: props.totalAmountPayable.cost,
      totalAmountToBeTransferred: props.totalAmountToBeTransferred.cost,
      totalRevenue: props.totalRevenue.cost,

      startDate: DateUtil.parseUTC(props.startDate.value).toDate(),
      endDate: DateUtil.parseUTC(props.endDate.value).toDate(),
      senderTaxRate: props.senderTaxRate.value,
      recipientTaxRate: props.recipientTaxRate.value,
      rentDays: props.rentDays,
      cost: props.cost.cost,
      currency: props.cost.currency,
      taxAmount: props.taxAmount.cost,

      rentPeriodStrategyType: props.rentPeriodStrategyType,

      isLastPayment: props.isLastPayment,
      isRecurring: props.isRecurring,
      status: props.status,
      isFailure: props.isFailure,
      invoices: props.invoices.map((invoice) => {
        const props = invoice.getPropsCopy();
        const customerReferenceProps = props.customerReference.unpack();

        return PaymentInvoiceOrmEntity.create({
          id: invoice.id.value,
          paymentTransactionId: entity.id.value,
          date: props.date.value,
          status: props.status.value,
          refersToUserId: props.refersToUserId.value,
          type: props.type,
          error: props.error,
          cardMeta: props.cardMeta,
          createdAt: props.createdAt.value,
          updatedAt: props.updatedAt.value,
          deletedAt: props.deletedAt?.value,
          customerReference: customerReferenceProps.customerReference,
          livinCustomerReference: customerReferenceProps.livinCustomerReference || null,
        });
      }),
    };

    return ormProps;
  }

  protected async toDomainProps(
    ormEntity: PaymentTransactionOrmEntity,
    trxId?: TransactionId,
  ): Promise<EntityProps<PaymentTransactionProps>> {
    const id = new UUID(ormEntity.id);

    const trx = trxId ? this.unitOfWork?.getTrx(trxId) : undefined;

    const contract = await ContractOrmEntity.query(trx).findById(ormEntity.contractId);

    if (
      !contract ||
      !contract.landlordId ||
      !contract.tenantId ||
      !contract.apartmentAdId ||
      !contract.tenantInnopayCardId
    ) {
      throw new NotFoundException('Contract not found');
    }

    const recipientInnopayCardQuery = InnopayCardOrmEntity.query(trx)
      .innerJoin(
        ApartmentAdOrmEntity.tableName,
        `${InnopayCardOrmEntity.tableName}.id`,
        `${ApartmentAdOrmEntity.tableName}.innopayCardId`,
      )
      .findOne(`${ApartmentAdOrmEntity.tableName}.id`, contract.apartmentAdId)
      .withGraphFetched({ innopayUser: true }, { joinOperation: 'innerJoin' })
      .modifyGraph('innopayUser', (builder) => {
        builder.select('userId', 'cnpUserId');
      });

    const senderInnopayCardQuery = InnopayCardOrmEntity.query(trx)
      .findById(contract.tenantInnopayCardId)
      .withGraphFetched({ innopayUser: true }, { joinOperation: 'innerJoin' })
      .modifyGraph('innopayUser', (builder) => {
        builder.select('userId', 'cnpUserId');
      })
      .where('appointmentType', InnopayAppointmentCardType.CHARGE_OFF);

    const [senderInnopayCard, recipientInnopayCard] = await Promise.all([
      senderInnopayCardQuery,
      recipientInnopayCardQuery,
    ]).then((cards) =>
      cards.map((card) => {
        if (!card || !card.innopayUser) {
          throw new NotFoundException('Card not found');
        }

        return new InnopayCardEntity({
          id: new UUID(card.id),
          props: {
            cardHolder: card.cardHolder,
            cardType: card.cardType,
            cnpCardId: card.cnpCardId,
            cnpUserId: card.innopayUser.cnpUserId,
            panMasked: new PanMaskedVO(card.panMasked),
            userId: new UUID(card.innopayUser.userId),
            appointmentType: card.appointmentType,
          },
          createdAt: new DateVO(card.createdAt),
          updatedAt: new DateVO(card.updatedAt),
          deletedAt: card.deletedAt ? new DateVO(card.deletedAt) : null,
        });
      }),
    );

    const props: PaymentTransactionProps = {
      contractId: new UUID(ormEntity.contractId),
      senderId: senderInnopayCard.userId,
      recipientId: recipientInnopayCard.userId,
      totalAmountPayable: CostAndCurrencyVO.create({
        cost: ormEntity.totalAmountPayable,
        currency: ormEntity.currency,
      }),
      totalAmountToBeTransferred: CostAndCurrencyVO.create({
        cost: ormEntity.totalAmountToBeTransferred,
        currency: ormEntity.currency,
      }),
      totalRevenue: CostAndCurrencyVO.create({
        cost: ormEntity.totalRevenue,
        currency: ormEntity.currency,
      }),
      withdrawFundsDate: new DateTimeISOTZVO(ormEntity.withdrawFundsDate.toISOString()),
      startDate: new DateTimeISOTZVO(ormEntity.startDate.toISOString()),
      endDate: new DateTimeISOTZVO(ormEntity.endDate.toISOString()),
      senderTaxRate: new TaxVO({ value: ormEntity.senderTaxRate }),
      recipientTaxRate: new TaxVO({ value: ormEntity.recipientTaxRate }),
      rentDays: ormEntity.rentDays,
      cost: CostAndCurrencyVO.create({ cost: ormEntity.cost, currency: ormEntity.currency }),
      taxAmount: CostAndCurrencyVO.create({ cost: ormEntity.taxAmount, currency: ormEntity.currency }),
      rentPeriodStrategyType: ormEntity.rentPeriodStrategyType,
      isLastPayment: ormEntity.isLastPayment,
      isRecurring: ormEntity.isRecurring,
      status: ormEntity.status,
      isFailure: ormEntity.isFailure,
      senderCard: senderInnopayCard,
      recipientCard: recipientInnopayCard,
      invoices: ormEntity.invoices
        ? ormEntity.invoices.map(
            (invoice) =>
              new PaymentInvoiceEntity({
                id: new UUID(invoice.id),
                props: {
                  date: new DateTimeISOTZVO(ormEntity.withdrawFundsDate.toISOString()),
                  paymentTransactionId: id,
                  status: PaymentInvoiceStatusVO.create(invoice.status),
                  refersToUserId: new UUID(invoice.refersToUserId),
                  type: invoice.type,
                  error: invoice.error,
                  cardMeta: invoice.cardMeta,
                  customerReference: new CustomerReferenceVO({
                    customerReference: invoice.customerReference,
                    livinCustomerReference: invoice.livinCustomerReference || undefined,
                  }),
                },
                createdAt: new DateVO(invoice.createdAt),
                updatedAt: new DateVO(invoice.updatedAt),
                deletedAt: invoice.deletedAt ? new DateVO(invoice.deletedAt) : null,
              }),
          )
        : [],
    };

    return { id, props };
  }
}
