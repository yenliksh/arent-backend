import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { costCeil, costFloor } from '@domains/contract/base-classes/rental-strategies/utils/cost-rounds.util';
import { InnopayCardEntity } from '@domains/innopay-card/domain/entities/innopay-card.entity';
import { CustomerReferenceVO } from '@domains/payment-transaction/domain/value-objects/customer-reference.value-object';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { Guard } from '@libs/ddd/domain/guard';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { INNOPAY_CASH_IN_TAX_RATE, INNOPAY_CASH_OUT_TAX_RATE } from 'src/rental-context/constants';

import { PaymentTransactionHasEmptyFieldsError } from '../errors/payment-transaction.errors';
import { CardMeta, PaymentInvoiceStatus, PaymentInvoiceType, PaymentTransactionStatus } from '../types';
import { PaymentInvoiceStatusVO } from '../value-objects/payment-invoice-status.value-object';
import { PaymentInvoiceEntity } from './payment-invoice.entity';
import { PaymentTransactionBase } from './types';

export interface CreatePaymentTransactionProps extends PaymentTransactionBase {
  contractId: UUID;
  recipientId: UUID; // landlord
  senderId: UUID; // tenant
  isLastPayment: boolean; // флаг для отправки евента лендлорду что последняя транзакция по оплате тенантом зафакапилась (рекурринг/ частичная)
  isRecurring: boolean; // флаг того, что платеж входит в группу рекурентных платежей (несколько платежей для одного контракта)
  rentPeriodStrategyType: RentPeriodStrategyType; // тип для того чтоб выдать история платежей корректно
}

export type PaymentTransactionProps = CreatePaymentTransactionProps & {
  status: PaymentTransactionStatus;
  isFailure: boolean;
  senderCard?: InnopayCardEntity;
  recipientCard?: InnopayCardEntity;
  invoices: PaymentInvoiceEntity[];
};

export type PaymentTransactionMeta = {
  id: string;
  status: PaymentTransactionStatus;
  startDate: Date;
  endDate: Date;
  withdrawFundsDate: Date;
};

export class PaymentTransactionEntity extends AggregateRoot<PaymentTransactionProps> {
  protected readonly _id: UUID;
  static readonly EARLY_PAY_DAYS = 7;
  static readonly CASH_OUT_AFTER_ARRIVAL_DAYS = 1;

  get recipientId() {
    return this.props.recipientId;
  }

  get senderId() {
    return this.props.senderId;
  }

  static create({
    contractId,
    totalAmountPayable,
    totalAmountToBeTransferred,
    totalRevenue,
    withdrawFundsDate,
    startDate,
    endDate,
    senderTaxRate,
    recipientTaxRate,
    rentDays,
    cost,
    taxAmount,
    isLastPayment,
    isRecurring,
    recipientId,
    senderId,
    rentPeriodStrategyType,
  }: CreatePaymentTransactionProps): PaymentTransactionEntity {
    const id = UUID.generate();

    const props: PaymentTransactionProps = {
      contractId,
      totalAmountPayable,
      totalAmountToBeTransferred,
      totalRevenue,
      withdrawFundsDate,
      startDate,
      endDate,
      senderTaxRate,
      recipientTaxRate,
      rentDays,
      cost,
      taxAmount,
      isLastPayment,
      isRecurring,
      recipientId,
      senderId,
      invoices: [],
      status: PaymentTransactionStatus.CASH_IN_WAITING,
      isFailure: false,
      rentPeriodStrategyType,
    };

    const paymentTransaction = new PaymentTransactionEntity({ id, props });

    return paymentTransaction;
  }

  get isLastPayment() {
    return this.props.isLastPayment;
  }

  isCashInActive() {
    const { invoices } = this.props;

    const paymentHasActiveStatus = this.props.status === PaymentTransactionStatus.CASH_IN_WAITING;

    const successInvoices = invoices.filter((invoice) => invoice.status === PaymentInvoiceStatus.SUCCESS).length === 0;

    const earlyPaymentDate = this.props.withdrawFundsDate.getDate();
    earlyPaymentDate.setDate(earlyPaymentDate.getDate() - PaymentTransactionEntity.EARLY_PAY_DAYS);

    return paymentHasActiveStatus && successInvoices && earlyPaymentDate <= DateUtil.utcNow().toDate();
  }

  isCashOutActive() {
    const { invoices, isRecurring, startDate } = this.props;

    const paymentHasActiveStatus = this.props.status === PaymentTransactionStatus.CASH_OUT_WAITING;

    const successInvoices = invoices.filter((invoice) => invoice.status === PaymentInvoiceStatus.SUCCESS).length === 1;
    // first success invoice - cash in invoice
    // second success invoice - cash out invoice
    // 2 success invoices => payment is completed and not active

    const paymentDate = startDate.getDate();
    if (!isRecurring) {
      paymentDate.setDate(paymentDate.getDate() + PaymentTransactionEntity.CASH_OUT_AFTER_ARRIVAL_DAYS);
    }

    return paymentHasActiveStatus && successInvoices && paymentDate <= DateUtil.utcNow().toDate();
  }

  isReadyToSelfPayNow(tenantId: UUID) {
    return this.props.senderId.equals(tenantId) && this.isCashInActive();
  }

  isReadyToFirstContractPay() {
    return !this.props.isRecurring && this.isCashInActive();
  }

  cashInSuccess(cardMeta: CardMeta, customerReference: { customerReference: string }) {
    this.addSuccessInvoice(PaymentInvoiceType.WITHDRAW, cardMeta, customerReference);

    this.props.status = PaymentTransactionStatus.CASH_OUT_WAITING;

    this.validate();
  }

  cashOutSuccess(
    cardMeta: CardMeta,
    customerReference: { customerReference: string; livinCustomerReference?: string },
  ) {
    this.addSuccessInvoice(PaymentInvoiceType.RECEIVING, cardMeta, customerReference);

    this.props.status = PaymentTransactionStatus.COMPLETED;

    this.validate();
  }

  failure(
    action: PaymentInvoiceType,
    cardMeta: CardMeta,
    customerReference: { customerReference: string; livinCustomerReference?: string },
    error?: string,
  ) {
    this.props.isFailure = true;
    this.addFailureInvoice(action, cardMeta, customerReference, error);

    this.validate();
  }

  cancel() {
    this.props.status = PaymentTransactionStatus.CANCELED;

    this.validate();
  }

  private addSuccessInvoice(
    type: PaymentInvoiceType,
    cardMeta: CardMeta,
    customerReference: { customerReference: string; livinCustomerReference?: string },
  ) {
    const refersToUserId = type === PaymentInvoiceType.RECEIVING ? this.props.recipientId : this.props.senderId;
    this.props.invoices.push(
      PaymentInvoiceEntity.create({
        date: new DateTimeISOTZVO(),
        paymentTransactionId: this._id,
        status: PaymentInvoiceStatusVO.create(PaymentInvoiceStatus.SUCCESS),
        customerReference: new CustomerReferenceVO(customerReference),
        refersToUserId,
        cardMeta,
        type,
      }),
    );
  }

  private addFailureInvoice(
    type: PaymentInvoiceType,
    cardMeta: CardMeta,
    customerReference: { customerReference: string; livinCustomerReference?: string },
    error?: string,
  ) {
    const refersToUserId = type === PaymentInvoiceType.WITHDRAW ? this.props.senderId : this.props.recipientId;
    this.props.invoices.push(
      PaymentInvoiceEntity.create({
        date: new DateTimeISOTZVO(),
        paymentTransactionId: this._id,
        status: PaymentInvoiceStatusVO.create(PaymentInvoiceStatus.FAILURE),
        customerReference: new CustomerReferenceVO(customerReference),
        refersToUserId,
        type,
        error,
        cardMeta,
      }),
    );
  }

  get id() {
    return this._id;
  }

  public get totalAmountPayable() {
    return this.props.totalAmountPayable.cost;
  }

  public get totalAmountPayableCurrency() {
    return this.props.totalAmountPayable.currency;
  }

  public get costPayable() {
    return this.props.cost.cost;
  }

  public get costPayableCurrency() {
    return this.props.cost.currency;
  }

  get rentDays() {
    return this.props.rentDays;
  }

  get cost() {
    return this.props.cost;
  }

  get status() {
    return this.props.status;
  }

  get startDate() {
    return this.props.startDate;
  }

  get endDate() {
    return this.props.endDate;
  }

  get withdrawFundsDate() {
    return this.props.withdrawFundsDate.value;
  }

  get taxAmount() {
    return this.props.taxAmount.cost;
  }

  get totalRevenue() {
    return this.props.totalRevenue.cost;
  }

  get totalAmountToBeTransferred() {
    return this.props.totalAmountToBeTransferred.cost;
  }

  get contractId() {
    return this.props.contractId;
  }

  get senderCardOrFail() {
    if (!this.props.senderCard) {
      throw new ArgumentInvalidException('Sender card required');
    }

    return this.props.senderCard;
  }

  get recipientCardOrFail() {
    if (!this.props.recipientCard) {
      throw new ArgumentInvalidException('Recipient card required');
    }

    return this.props.recipientCard;
  }

  get isRecurring() {
    return this.props.isRecurring;
  }

  get metaInfo(): PaymentTransactionMeta {
    return {
      id: this.id.value,
      status: this.status,
      startDate: DateUtil.parseUTC(this.startDate.value).toDate(),
      endDate: DateUtil.parseUTC(this.endDate.value).toDate(),
      withdrawFundsDate: DateUtil.parseUTC(this.withdrawFundsDate).toDate(),
    };
  }

  // only for middle and long
  public setCheckOutDate(newCheckOutDate: string) {
    if (this.props.rentPeriodStrategyType === RentPeriodStrategyType.SHORT_TERM_RENT) {
      throw new ArgumentInvalidException('Checkout date can be applied only for middle term rent and long term rent');
    }

    if (DateUtil.parseUTC(this.props.startDate.value).isAfter(newCheckOutDate)) {
      throw new ArgumentInvalidException('Start date cannot be greater than end date');
    }

    if (DateUtil.parseUTC(this.props.withdrawFundsDate.value).isAfter(newCheckOutDate)) {
      throw new ArgumentInvalidException('Withdraw date cannot be greater than end date');
    }

    const newRentDays = DateUtil.getDiffDays(this.props.startDate.value, newCheckOutDate);

    let cost = this.props.cost.cost;

    if (this.props.rentPeriodStrategyType === RentPeriodStrategyType.LONG_TERM_RENT) {
      const oldRentDays = DateUtil.getDiffDays(this.props.startDate.value, this.props.endDate.value);
      const costPerDay = cost / oldRentDays;
      cost = costPerDay;
    }

    const senderTaxAmount = newRentDays * cost * this.props.senderTaxRate.value;

    const recomputedTotalAmountPayable = newRentDays * cost + senderTaxAmount;

    const recomputedTotalAmountToBeTransferred =
      (newRentDays * cost * (1 - this.props.recipientTaxRate.value)) / (1 - INNOPAY_CASH_OUT_TAX_RATE); // добавляем комиссию кешаута чтоб до лендлорда дошла круглая сумма

    const recomputedTotalRevenue =
      recomputedTotalAmountPayable -
      recomputedTotalAmountToBeTransferred -
      recomputedTotalAmountPayable * INNOPAY_CASH_IN_TAX_RATE;

    this.props.totalAmountPayable = CostAndCurrencyVO.create({ cost: costCeil(recomputedTotalAmountPayable) });
    this.props.totalAmountToBeTransferred = CostAndCurrencyVO.create({
      cost: costCeil(recomputedTotalAmountToBeTransferred),
    });
    this.props.totalRevenue = CostAndCurrencyVO.create({ cost: costFloor(recomputedTotalRevenue) });

    this.props.taxAmount = CostAndCurrencyVO.create({ cost: costCeil(senderTaxAmount) });
    this.props.endDate = new DateTimeISOTZVO(newCheckOutDate);
    this.props.rentDays = newRentDays;
    this.props.isLastPayment = true;

    return this;
  }

  validate(): void {
    const {
      contractId,
      withdrawFundsDate,
      totalAmountPayable,
      startDate,
      endDate,
      senderTaxRate,
      recipientTaxRate,
      rentDays,
      cost,
      taxAmount,
      status,
      isRecurring,
      rentPeriodStrategyType,
    } = this.props;

    const fields = [
      contractId,
      withdrawFundsDate,
      totalAmountPayable,
      startDate,
      endDate,
      senderTaxRate,
      recipientTaxRate,
      rentDays,
      cost,
      taxAmount,
      status,
      isRecurring,
      rentPeriodStrategyType,
    ];

    if (fields.some((f) => f == null)) {
      throw new PaymentTransactionHasEmptyFieldsError('Contract transaction must to have complete all required fields');
    }
    if (!Guard.isPositiveNumber(rentDays)) {
      throw new ArgumentInvalidException('Rented days must be positive number');
    }
  }
}
