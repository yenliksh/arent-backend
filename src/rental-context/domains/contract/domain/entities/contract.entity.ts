import { ApartmentGuestsVO } from '@domain-value-objects/apartment-guests.value-object';
import { ApartmentRulesProps, ApartmentRulesVO } from '@domain-value-objects/apartment-rules.value-object';
import {
  CancellationPolicyCreateProps,
  CancellationPolicyVO,
} from '@domain-value-objects/cancellation-policy.value-object';
import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { PaymentMethodVO } from '@domain-value-objects/payment-method.value-object';
import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ShortTermRentPaymentTypeVO } from '@domain-value-objects/short-term-rent-payment-type.value-object';
import { TaxVO } from '@domain-value-objects/tax.value-object';
import { CurrencyType } from '@domains/apartment-ad/domain/types';
import { LongTermRentLandlordCancelationStrategy } from '@domains/contract/base-classes/rental-cancelation-strategies/long-term-rent-cancelation-strategies/long-term-rent-landlord-cancelation.strategy';
import { LongTermRentTenantCancelationStrategy } from '@domains/contract/base-classes/rental-cancelation-strategies/long-term-rent-cancelation-strategies/long-term-rent-tenant-cancelation.strategy';
import { MiddleTermRentLandlordCancelationStrategy } from '@domains/contract/base-classes/rental-cancelation-strategies/middle-term-rent-cancelation-strategies/middle-term-rent-landlord-cancelation.strategy';
import { MiddleTermRentTenantCancelationStrategy } from '@domains/contract/base-classes/rental-cancelation-strategies/middle-term-rent-cancelation-strategies/middle-term-rent-tenant-cancelation.strategy';
import { ShortTermRentLandlordCancelationStrategy } from '@domains/contract/base-classes/rental-cancelation-strategies/short-term-rent-cancelation-strategies/short-term-rent-landlord-cancelation.strategy';
import { ShortTermRentTenantCancelationStrategy } from '@domains/contract/base-classes/rental-cancelation-strategies/short-term-rent-cancelation-strategies/short-term-rent-tenant-cancelation.strategy';
import { RentalDateGuard } from '@domains/contract/base-classes/rental-guards/rental-date.guard';
import { PaymentManager } from '@domains/contract/base-classes/rental-manager/rental.manager';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { ISystemMessageData } from '@domains/message/domain/types';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { TemporaryPaymentTransactionEntity } from '@domains/temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity';
import { UrlVO } from '@domains/user/domain/value-objects';
import {
  ApartmentRentPeriodType,
  ContractStatus,
  PaymentMethod,
  ShortTermRentBookingType,
  ShortTermRentPaymentType,
} from '@infrastructure/enums';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException, ArgumentNotProvidedException, ArgumentOutOfRangeException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { DateUtil } from '@libs/utils/date-util';
import { UnprocessableEntityException } from '@nestjs/common';
import {
  LONG_RENT_PERIOD_MAX_COST,
  LONG_RENT_PERIOD_MIN_COST,
  SHORT_RENT_PERIOD_MAX_COST,
  SHORT_RENT_PERIOD_MIN_COST,
} from 'src/rental-context/constants';

import { ContractStatusVO } from '../../../../domain-value-objects/contract-status.value-object';
import { ContractHasEmptyFieldsError } from '../errors/contract.errors';
import { AdminCancelationMode, CancellationData, CancellationTrigger, CreateContractStatus } from '../types';
import { BaseContractApartmentAdDataVO } from '../value-objects/base-contract-apartment-ad-data.value-object';
import { ContractDetailsProps, ContractDetailsVO } from '../value-objects/contract-details.value-object';
import { TemporaryPaymentDataVO } from '../value-objects/temporary-payment-data.value-object';
import { ContractCancelationEntity } from './contract-cancelation.entity';

export interface CreateContractProps {
  contractRequestId?: UUID;
  tenantId?: UUID;
  apartmentAdId?: UUID;
  apartmentRentPeriodType: ApartmentRentPeriodType;
  landlordId?: UUID;
  costAndCurrency: CostAndCurrencyVO;
  status: CreateContractStatus;
  detailsProps: ContractDetailsProps;
  rentPeriodVersion: RentPeriodVersionEntity;
  cancellationPolicyProps: CancellationPolicyCreateProps;
  tenantPaymentMethod?: PaymentMethodVO;
  shortTermRentBookingType?: ShortTermRentBookingTypeVO;
  shortTermRentPaymentType?: ShortTermRentPaymentTypeVO;
  baseContractApartmentAdData: BaseContractApartmentAdDataVO;
  isFined: boolean;
  guests: ApartmentGuestsVO;
  paymentData?: TemporaryPaymentDataVO | null;
  isTemporary?: boolean;
}

export type ContractProps = Omit<
  CreateContractProps,
  'detailsProps' | 'status' | 'cancellationPolicyProps' | 'isTemporary' | 'paymentData'
> & {
  isPending: boolean;
  isExistUnpaidTransactions: boolean;
  status: ContractStatusVO;
  details: ContractDetailsVO;
  cancellationPolicy: CancellationPolicyVO;
  nextPaymentTransactionId?: UUID;
  contractCancelation?: ContractCancelationEntity;
  isTemporary: boolean;
  paymentData: TemporaryPaymentDataVO | null;
};

export class ContractEntity extends AggregateRoot<ContractProps> {
  protected readonly _id: UUID;
  private static readonly PARTIAL_PAYMENT_DAYS_BEFORE_CANCEL = 7;
  static readonly TEMPORARY_CONTRACT_LIFE_TIME_PER_MINUTES = 30;

  static create({
    apartmentAdId,
    detailsProps,
    tenantId,
    costAndCurrency,
    status,
    apartmentRentPeriodType,
    landlordId,
    contractRequestId,
    rentPeriodVersion,
    cancellationPolicyProps,
    tenantPaymentMethod,
    shortTermRentBookingType,
    shortTermRentPaymentType,
    baseContractApartmentAdData,
    isFined = false,
    guests,
    isTemporary,
    paymentData,
  }: CreateContractProps): ContractEntity {
    const id = UUID.generate();

    const props: ContractProps = {
      contractRequestId,
      apartmentAdId,
      details: new ContractDetailsVO(detailsProps),
      costAndCurrency,
      status: ContractStatusVO.create(status),
      tenantId,
      apartmentRentPeriodType,
      landlordId,
      rentPeriodVersion,
      cancellationPolicy: CancellationPolicyVO.create(apartmentRentPeriodType, cancellationPolicyProps),
      isPending: false,
      tenantPaymentMethod,
      shortTermRentBookingType,
      shortTermRentPaymentType,
      baseContractApartmentAdData,
      guests,
      isFined,
      isExistUnpaidTransactions: false,
      isTemporary: isTemporary ?? false,
      paymentData: paymentData ?? null,
    };

    const contract = new ContractEntity({ id, props });

    return contract;
  }

  setTenantPaymentMethod(cardId: UUID) {
    const isActive = this.isActive();
    if (!isActive) {
      throw new UnprocessableEntityException('Set tenant payment method available only for active contract');
    }

    this.props.tenantPaymentMethod = new PaymentMethodVO({
      innopayCardId: cardId.value,
      defaultType: PaymentMethod.INNOPAY,
    });

    this.validate();
  }

  setOffer({ allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets }: ApartmentRulesProps) {
    const { status, shortTermRentBookingType } = this.props;

    if (status.value !== ContractStatus.CREATED) {
      throw new ArgumentInvalidException(`You can send offer if contract status = ${ContractStatus.CREATED} only`);
    }
    if (shortTermRentBookingType?.value === ShortTermRentBookingType.INSTANT) {
      throw new ArgumentInvalidException('You can not set offer in instant booking contract');
    }

    this.props.details = new ContractDetailsVO({
      arrivalDate: this.props.details.arrivalDate,
      departureDate: this.props.details.departureDate,
      rules: ApartmentRulesVO.create({
        allowedToHangingOut,
        allowedToSmoke,
        allowedWithChildren,
        allowedWithPets,
      }),
    });
    this.props.status = ContractStatusVO.create(ContractStatus.OFFERING);

    this.validate();
  }

  instantBooking() {
    if (
      this.props.status.value !== ContractStatus.CREATED ||
      this.props.shortTermRentBookingType?.value !== ShortTermRentBookingType.INSTANT
    ) {
      throw new ArgumentInvalidException(
        `You can instant booking if contract status = ${ContractStatus.CREATED} and shortTermRentBookingType = ${ShortTermRentBookingType.INSTANT} only`,
      );
    }

    this.props.status = ContractStatusVO.create(ContractStatus.CONCLUDED);

    this.validate();

    return this.generateTransactions();
  }

  temporaryInstantBooking() {
    if (
      this.props.status.value !== ContractStatus.CREATED ||
      this.props.shortTermRentBookingType?.value !== ShortTermRentBookingType.INSTANT
    ) {
      throw new ArgumentInvalidException(
        `You can instant booking if contract status = ${ContractStatus.CREATED} and shortTermRentBookingType = ${ShortTermRentBookingType.INSTANT} only`,
      );
    }
    if (!this.props.isTemporary) {
      throw new ArgumentInvalidException('You can instant temporary conclude only contracts with isTemporary = true');
    }

    this.props.status = ContractStatusVO.create(ContractStatus.CONCLUDED);

    this.validate();

    const paymentManager = PaymentManager.defineStrategy(this);
    const generatedTransactions = paymentManager.handle().data;

    return generatedTransactions.map((transaction, index) =>
      TemporaryPaymentTransactionEntity.create({
        contractId: this._id,
        isFirst: !index,
        totalAmountPayable: CostAndCurrencyVO.create({ cost: transaction.totalAmountPayable }),
        totalAmountToBeTransferred: CostAndCurrencyVO.create({ cost: transaction.totalAmountToBeTransferred }),
        totalRevenue: CostAndCurrencyVO.create({ cost: transaction.totalRevenue }),
        withdrawFundsDate: new DateTimeISOTZVO(transaction.withdrawFundsDate),
        startDate: new DateTimeISOTZVO(transaction.startDate),
        endDate: new DateTimeISOTZVO(transaction.endDate),
        senderTaxRate: new TaxVO({ value: transaction.senderTaxRate }),
        recipientTaxRate: new TaxVO({ value: transaction.recipientTaxRate }),
        rentDays: transaction.rentDays,
        cost: CostAndCurrencyVO.create({ cost: transaction.cost }),
        taxAmount: CostAndCurrencyVO.create({ cost: transaction.taxAmount }),
      }),
    );
  }

  acceptOffer(cardId: UUID) {
    const { status, shortTermRentBookingType } = this.props;

    if (status.value !== ContractStatus.OFFERING) {
      throw new ArgumentInvalidException(`You can accept offer if contract status = ${ContractStatus.OFFERING} only`);
    }
    if (shortTermRentBookingType?.value === ShortTermRentBookingType.INSTANT) {
      throw new ArgumentInvalidException('You can not set offer in instant booking contract');
    }

    this.props.tenantPaymentMethod = new PaymentMethodVO({
      innopayCardId: cardId.value,
      defaultType: PaymentMethod.INNOPAY,
    });

    this.props.status = ContractStatusVO.create(ContractStatus.CONCLUDED);

    this.validate();

    return this.generateTransactions();
  }

  acceptOfferDown() {
    if (this.props.status.value === ContractStatus.OFFERING) {
      return;
    }

    if (this.props.status.value !== ContractStatus.CONCLUDED) {
      throw new ArgumentInvalidException(
        `You can down accept offer if contract status = ${ContractStatus.CONCLUDED} only`,
      );
    }

    this.props.tenantPaymentMethod = undefined;
    this.props.status = ContractStatusVO.create(ContractStatus.OFFERING);
  }

  temporaryConclude() {
    if (this.props.status.value !== ContractStatus.OFFERING) {
      throw new ArgumentInvalidException(
        `You can temporary conclude contract if status = ${ContractStatus.OFFERING} only`,
      );
    }

    this.props.status = ContractStatusVO.create(ContractStatus.CONCLUDED);
    this.props.isTemporary = true;

    this.validate();

    const paymentManager = PaymentManager.defineStrategy(this);
    const generatedTransactions = paymentManager.handle().data;

    return generatedTransactions.map((transaction, index) =>
      TemporaryPaymentTransactionEntity.create({
        contractId: this._id,
        isFirst: !index,
        totalAmountPayable: CostAndCurrencyVO.create({ cost: transaction.totalAmountPayable }),
        totalAmountToBeTransferred: CostAndCurrencyVO.create({ cost: transaction.totalAmountToBeTransferred }),
        totalRevenue: CostAndCurrencyVO.create({ cost: transaction.totalRevenue }),
        withdrawFundsDate: new DateTimeISOTZVO(transaction.withdrawFundsDate),
        startDate: new DateTimeISOTZVO(transaction.startDate),
        endDate: new DateTimeISOTZVO(transaction.endDate),
        senderTaxRate: new TaxVO({ value: transaction.senderTaxRate }),
        recipientTaxRate: new TaxVO({ value: transaction.recipientTaxRate }),
        rentDays: transaction.rentDays,
        cost: CostAndCurrencyVO.create({ cost: transaction.cost }),
        taxAmount: CostAndCurrencyVO.create({ cost: transaction.taxAmount }),
      }),
    );
  }

  setPaymentData(props: { customerReference: string; paymentUrl: string; paymentUrlStartAt: Date }) {
    this.props.paymentData = new TemporaryPaymentDataVO({
      customerReference: props.customerReference,
      paymentUrl: new UrlVO(props.paymentUrl),
      paymentUrlStartAt: props.paymentUrlStartAt,
    });
  }

  modifyToPermanent(cardId: UUID) {
    if (!this.isValidTemporary) {
      throw new ArgumentNotProvidedException('Contract not temporary');
    }

    this.props.tenantPaymentMethod = new PaymentMethodVO({
      innopayCardId: cardId.value,
      defaultType: PaymentMethod.INNOPAY,
    });

    this.props.isTemporary = false;
    this.props.paymentData = null;

    this.validate();
  }

  rollbackChatBookingTemporary() {
    if (!this.isValidTemporary) {
      throw new ArgumentNotProvidedException('Contract not temporary');
    }

    this.props.status = ContractStatusVO.create(ContractStatus.OFFERING);
    this.props.isTemporary = false;
    this.props.paymentData = null;
    this.props.nextPaymentTransactionId = undefined;

    this.validate();
  }

  rejectOffer() {
    const { status } = this.props;

    if (status.value !== ContractStatus.OFFERING) {
      throw new ArgumentInvalidException(`You can reject offer if contract status = ${ContractStatus.OFFERING} only`);
    }

    this.props.status = ContractStatusVO.create(ContractStatus.CREATED);
    this.validate();
  }

  setPending() {
    this.props.isPending = true;
  }

  endPending() {
    this.props.isPending = false;
  }

  isReadyToReject(): boolean {
    const { status } = this.props;

    if (status.value === ContractStatus.CONCLUDED || status.value === ContractStatus.OFFERING || this.isPending) {
      return false;
    }

    return true;
  }

  isReadyToAcceptInChat(): boolean {
    const { status, shortTermRentBookingType, isTemporary } = this.props;
    return (
      !isTemporary &&
      status.value === ContractStatus.OFFERING &&
      shortTermRentBookingType?.value !== ShortTermRentBookingType.INSTANT
    );
  }

  isActive(): boolean {
    const { status } = this.props;

    if (status.value === ContractStatus.REJECTED || status.value === ContractStatus.COMPLETED) {
      return false;
    }

    return true;
  }

  reject() {
    const isReadyToReject = this.isReadyToReject();

    if (!isReadyToReject) {
      throw new ArgumentInvalidException('Contract not ready to reject');
    }

    this.props.status = ContractStatusVO.create(ContractStatus.REJECTED);

    return this;
  }

  setDates(dates: { arrivalDate: string; departureDate: string }) {
    this.props.details = new ContractDetailsVO({
      arrivalDate: new DateTimeISOTZVO(dates.arrivalDate),
      departureDate: new DateTimeISOTZVO(dates.departureDate),
      rules: this.props.details.rules,
    });

    this.validate();
  }

  setNextPaymentTransactionId(nextPaymentTransactionId?: UUID) {
    this.props.nextPaymentTransactionId = nextPaymentTransactionId;
    this.validate();
  }

  isPartialPaymentNeedToCancel(startCashInDate: string) {
    const isPartialPaymentType = this.props.shortTermRentPaymentType?.value === ShortTermRentPaymentType.PARTIAL;
    const isPaymentIntervalOver =
      DateUtil.parseUTC(startCashInDate).add(ContractEntity.PARTIAL_PAYMENT_DAYS_BEFORE_CANCEL, 'day') <
      DateUtil.utcNow();

    return isPartialPaymentType && isPaymentIntervalOver;
  }

  cancel(
    data: {
      paymentTransactions: PaymentTransactionEntity[];
      trigger: CancellationTrigger;
      newCheckOutDate?: DateTimeISOTZVO;
    },
    adminCancelMeta?: AdminCancelationMode,
  ): CancellationData {
    const { paymentTransactions, trigger, newCheckOutDate } = data;
    if (!this.props.isPending) {
      throw new UnprocessableEntityException('You cannot cancel contract if isPending=false');
    }
    if (!paymentTransactions.every((transaction) => transaction.contractId.equals(this.id))) {
      throw new ArgumentInvalidException('Some payment transactions not belong to this contract');
    }
    if (!this.isCanCancelled) {
      throw new ArgumentInvalidException(`You can cancel concluded contract if status = ${ContractStatus.CONCLUDED}`);
    }

    const cancelationData =
      trigger === CancellationTrigger.TENANT
        ? this.generateTenantCancelationData(paymentTransactions, newCheckOutDate, !!adminCancelMeta)
        : this.generateLandlordCancelationData(paymentTransactions, adminCancelMeta);

    if (!DateUtil.isFuture(cancelationData.checkOutDate)) {
      this.props.status = ContractStatusVO.create(ContractStatus.REJECTED);
    }
    this.props.nextPaymentTransactionId = undefined;

    const isContainRecomputedLastStayTransaction = (
      cancelationData:
        | ReturnType<typeof this.generateTenantCancelationData>
        | ReturnType<typeof this.generateLandlordCancelationData>,
    ): cancelationData is ReturnType<typeof this.generateTenantCancelationData> => {
      return (
        (cancelationData as ReturnType<typeof this.generateTenantCancelationData>)?.recomputedLastStayTransaction !==
        undefined
      );
    };

    const isRecomputedLastStayTransaction = isContainRecomputedLastStayTransaction(cancelationData)
      ? !!cancelationData.recomputedLastStayTransaction
      : false;

    const nowIsStayTime = this.props.details.arrivalDate
      ? DateUtil.getDiffHours(DateUtil.utcNow().toISOString(), this.props.details.arrivalDate.value) <= 0
      : false;

    if (isRecomputedLastStayTransaction || nowIsStayTime) {
      this.props.details.decreaseDepartureDate(new DateTimeISOTZVO(cancelationData.checkOutDate));
    }

    this.validate();
    return cancelationData;
  }

  private generateTransactions() {
    const paymentManager = PaymentManager.defineStrategy(this);
    const generatedTransactions = paymentManager.handle().data;

    const transactions = generatedTransactions.map((generatedTransaction, index) =>
      PaymentTransactionEntity.create({
        rentPeriodStrategyType: generatedTransaction.rentPeriodStrategyType,
        contractId: this._id,
        totalAmountPayable: CostAndCurrencyVO.create({ cost: generatedTransaction.totalAmountPayable }),
        totalAmountToBeTransferred: CostAndCurrencyVO.create({ cost: generatedTransaction.totalAmountToBeTransferred }),
        totalRevenue: CostAndCurrencyVO.create({ cost: generatedTransaction.totalRevenue }),
        withdrawFundsDate: new DateTimeISOTZVO(generatedTransaction.withdrawFundsDate),
        startDate: new DateTimeISOTZVO(generatedTransaction.startDate),
        endDate: new DateTimeISOTZVO(generatedTransaction.endDate),
        senderTaxRate: new TaxVO({ value: generatedTransaction.senderTaxRate }),
        recipientTaxRate: new TaxVO({ value: generatedTransaction.recipientTaxRate }),
        rentDays: generatedTransaction.rentDays,
        cost: CostAndCurrencyVO.create({ cost: generatedTransaction.cost }),
        taxAmount: CostAndCurrencyVO.create({ cost: generatedTransaction.taxAmount }),
        isLastPayment: generatedTransaction.isLastPayment,
        isRecurring: !!index && generatedTransactions.length > 1,
        recipientId: this.landlordIdOrFail,
        senderId: this.tenantIdOrFail,
      }),
    );

    return transactions;
  }

  private generateTenantCancelationData(
    paymentTransactions: PaymentTransactionEntity[],
    newCheckOutDate?: DateTimeISOTZVO,
    isCancelationByAdmin = false,
  ): {
    refundsAmountToSender: number;
    transferAmountToRecipient: number;
    transferAmountToPlatform: number;
    cancelationDate: string;
    checkOutDate: string;
    withdrawalAmountFromSender?: number;
    recomputedLastStayTransaction?: PaymentTransactionEntity;
  } {
    const rentalDateGuard = new RentalDateGuard(this.rentPeriodVersion, this.props.status.value);
    const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
      arrivalDate: this.arrivalDateOrFail,
      departureDate: this.departureDateOrFail,
    });

    if (paymentStrategyType === RentPeriodStrategyType.SHORT_TERM_RENT) {
      const cancelationManager = new ShortTermRentTenantCancelationStrategy(this, paymentTransactions);

      if (isCancelationByAdmin) {
        cancelationManager.cancelByAdmin();
      }

      const result = cancelationManager.handle();
      this.updateTenantContractCancelation(result);

      return result;
    }

    if (paymentStrategyType === RentPeriodStrategyType.MIDDLE_TERM_RENT) {
      const cancelationManager = new MiddleTermRentTenantCancelationStrategy(this, paymentTransactions);

      if (isCancelationByAdmin) {
        cancelationManager.cancelByAdmin();
      }

      const result = cancelationManager.handle(newCheckOutDate?.value);

      this.updateTenantContractCancelation(result);

      return result;
    }

    if (paymentStrategyType === RentPeriodStrategyType.LONG_TERM_RENT) {
      const cancelationManager = new LongTermRentTenantCancelationStrategy(this, paymentTransactions);

      if (isCancelationByAdmin) {
        cancelationManager.cancelByAdmin();
      }

      const result = cancelationManager.handle(newCheckOutDate?.value);
      this.updateTenantContractCancelation(result);

      return result;
    }

    throw new ArgumentNotProvidedException(`PaymentStrategyType = ${paymentStrategyType} not provided`);
  }

  private generateLandlordCancelationData(
    paymentTransactions: PaymentTransactionEntity[],
    adminCancelMeta?: AdminCancelationMode,
  ): {
    refundsAmountToSender: number;
    transferAmountToRecipient: number;
    transferAmountToPlatform: number;
    cancelationDate: string;
    checkOutDate: string;
    isFine: boolean;
  } {
    const rentalDateGuard = new RentalDateGuard(this.rentPeriodVersion, this.props.status.value);
    const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
      arrivalDate: this.arrivalDateOrFail,
      departureDate: this.departureDateOrFail,
    });

    if (paymentStrategyType === RentPeriodStrategyType.SHORT_TERM_RENT) {
      const cancelationManager = new ShortTermRentLandlordCancelationStrategy(this, paymentTransactions);

      if (adminCancelMeta) {
        cancelationManager.cancelByAdmin();
        adminCancelMeta.validExcuse && cancelationManager.validExcuse();
      }

      const result = cancelationManager.handle();
      this.updateLandlordContractCancelation(result);

      return result;
    }

    if (paymentStrategyType === RentPeriodStrategyType.MIDDLE_TERM_RENT) {
      const cancelationManager = new MiddleTermRentLandlordCancelationStrategy(this, paymentTransactions);

      if (adminCancelMeta) {
        cancelationManager.cancelByAdmin();
        adminCancelMeta.validExcuse && cancelationManager.validExcuse();
      }

      const result = cancelationManager.handle();
      this.updateLandlordContractCancelation(result);

      return result;
    }

    if (paymentStrategyType === RentPeriodStrategyType.LONG_TERM_RENT) {
      const cancelationManager = new LongTermRentLandlordCancelationStrategy(this, paymentTransactions);

      if (adminCancelMeta) {
        cancelationManager.cancelByAdmin();
        adminCancelMeta.validExcuse && cancelationManager.validExcuse();
        adminCancelMeta.force && cancelationManager.forcedCancelation();
      }

      const result = cancelationManager.handle();
      this.updateLandlordContractCancelation(result);

      return result;
    }

    throw new ArgumentNotProvidedException(`PaymentStrategyType = ${paymentStrategyType} not provided`);
  }

  private updateTenantContractCancelation(cancelationData: {
    refundsAmountToSender: number;
    transferAmountToRecipient: number;
    transferAmountToPlatform: number;
    cancelationDate: string;
    checkOutDate: string;
    withdrawalAmountFromSender?: number;
  }) {
    this.props.contractCancelation = ContractCancelationEntity.create({
      contractId: this.id,
      triggerUserId: this.tenantIdOrFail,
      cancelationDate: new DateTimeISOTZVO(cancelationData.cancelationDate),
      checkOutDate: new DateTimeISOTZVO(cancelationData.checkOutDate),
      refundsAmountToSender: CostAndCurrencyVO.create({
        cost: cancelationData?.refundsAmountToSender ?? 0,
        currency: CurrencyType.KZT,
      }),
      transferAmountToPlatform: CostAndCurrencyVO.create({
        cost: cancelationData?.transferAmountToPlatform ?? 0,
        currency: CurrencyType.KZT,
      }),
      transferAmountToRecipient: CostAndCurrencyVO.create({
        cost: cancelationData?.transferAmountToRecipient ?? 0,
        currency: CurrencyType.KZT,
      }),
      withdrawalAmountFromSender: CostAndCurrencyVO.create({
        cost: cancelationData?.withdrawalAmountFromSender ?? 0,
        currency: CurrencyType.KZT,
      }),
      withdrawalAmountFromRecipient: CostAndCurrencyVO.create({
        cost: 0,
        currency: CurrencyType.KZT,
      }),
      isFine: false,
    });
  }

  private updateLandlordContractCancelation(cancelationData: {
    cancelationDate: string;
    checkOutDate: string;
    refundsAmountToSender: number;
    withdrawalAmountFromRecipient: number;
    transferAmountToRecipient: number;
    transferAmountToPlatform: number;
    isFine: boolean;
  }) {
    this.props.contractCancelation = ContractCancelationEntity.create({
      contractId: this.id,
      triggerUserId: this.landlordIdOrFail,
      cancelationDate: new DateTimeISOTZVO(cancelationData.cancelationDate),
      checkOutDate: new DateTimeISOTZVO(cancelationData.checkOutDate),
      refundsAmountToSender: CostAndCurrencyVO.create({
        cost: cancelationData?.refundsAmountToSender ?? 0,
        currency: CurrencyType.KZT,
      }),
      transferAmountToPlatform: CostAndCurrencyVO.create({
        cost: cancelationData?.transferAmountToPlatform ?? 0,
        currency: CurrencyType.KZT,
      }),
      transferAmountToRecipient: CostAndCurrencyVO.create({
        cost: cancelationData?.transferAmountToRecipient ?? 0,
        currency: CurrencyType.KZT,
      }),
      withdrawalAmountFromSender: CostAndCurrencyVO.create({
        cost: 0,
        currency: CurrencyType.KZT,
      }),
      withdrawalAmountFromRecipient: CostAndCurrencyVO.create({
        cost: cancelationData?.withdrawalAmountFromRecipient ?? 0,
        currency: CurrencyType.KZT,
      }),
      isFine: cancelationData.isFine,
    });
  }

  get id() {
    return this._id;
  }

  get status() {
    return this.props.status;
  }

  get landlord() {
    return this.props.landlordId;
  }

  get tenant() {
    return this.props.tenantId;
  }

  get apartmentRentPeriodType() {
    return this.props.apartmentRentPeriodType;
  }

  get rules() {
    return this.props.details.rules?.unpack();
  }

  get arrivalDate() {
    return this.props.details.arrivalDate;
  }

  get departureDate() {
    return this.props.details.departureDate;
  }

  get isPending() {
    return this.props.isPending;
  }

  get isFined() {
    return this.props.isFined;
  }

  get isTemporary() {
    return this.props.isTemporary;
  }

  get costAndCurrency() {
    return this.props.costAndCurrency;
  }

  get rentPeriodVersion() {
    return this.props.rentPeriodVersion;
  }

  get timezone() {
    return this.props.baseContractApartmentAdData.timezone;
  }

  get apartmentAdIdOrFail() {
    const { apartmentAdId } = this.props;

    if (!apartmentAdId) {
      throw new ContractHasEmptyFieldsError('ApartmentAdId required');
    }

    return apartmentAdId;
  }

  get cancellationPolicy() {
    return this.props.cancellationPolicy.unpack();
  }

  get paymentType() {
    return this.props.shortTermRentPaymentType?.value;
  }

  get tenantIdOrFail() {
    const { tenantId } = this.props;

    if (!tenantId) {
      throw new ContractHasEmptyFieldsError('TenantId required');
    }

    return tenantId;
  }

  get landlordIdOrFail() {
    const { landlordId } = this.props;

    if (!landlordId) {
      throw new ContractHasEmptyFieldsError('LandlordId required');
    }

    return landlordId;
  }

  get arrivalDateOrFail() {
    const arrivalDate = this.props.details.arrivalDate?.value;

    if (!arrivalDate) {
      throw new ContractHasEmptyFieldsError('Arrival date required');
    }

    return arrivalDate;
  }

  get tenantPaymentCardOrFail() {
    const innopayCardId = this.props.tenantPaymentMethod?.innopayCardId;

    if (!innopayCardId) {
      throw new ContractHasEmptyFieldsError('Innopay card id required');
    }

    return innopayCardId;
  }

  get paymentDataOrFail() {
    const paymentData = this.props.paymentData;

    if (!paymentData) {
      throw new ContractHasEmptyFieldsError('Payment url required');
    }

    return {
      paymentUrl: paymentData.paymentUrl,
      paymentUrlStartAt: paymentData.paymentUrlStartAt,
      customerReference: paymentData.customerReference,
    };
  }

  get paymentData() {
    return this.props.paymentData;
  }

  get isValidTemporary() {
    return this.props.isTemporary && this.props.status.value === ContractStatus.CONCLUDED;
  }

  get shortTermRentBookingType() {
    return this.props.shortTermRentBookingType?.value;
  }

  get departureDateOrFail() {
    const departureDate = this.props.details.departureDate?.value;

    if (!departureDate) {
      throw new ContractHasEmptyFieldsError('Departure date required');
    }

    return departureDate;
  }

  get systemMessageData(): ISystemMessageData {
    const {
      status,
      apartmentRentPeriodType,
      details,
      costAndCurrency,
      cancellationPolicy,
      shortTermRentBookingType,
      shortTermRentPaymentType,
    } = this.props;

    return {
      status: status.value,
      apartmentRentPeriodType,
      arrivalDate: details.arrivalDate ? new Date(details.arrivalDate.value) : undefined,
      departureDate: details.departureDate ? new Date(details.departureDate.value) : undefined,
      rules: this.rules,
      cost: costAndCurrency.cost,
      longTermRentCancellationPolicyType: cancellationPolicy.longTermCancellationPolicy,
      shortTermRentCancellationPolicyType: cancellationPolicy.shortTermCancellationPolicy,
      shortTermRentBookingType: shortTermRentBookingType?.value,
      shortTermRentPaymentType: shortTermRentPaymentType?.value,
    };
  }

  get isCanCancelled() {
    return this.props.status.value === ContractStatus.CONCLUDED;
  }

  completePast() {
    if (!this.departureDate) {
      return;
    }

    const isConcluded = this.status.value === ContractStatus.CONCLUDED;
    const isPast = DateUtil.parse(this.departureDate.value).isBefore(DateUtil.utcNow());

    if (isConcluded && isPast && !this.props.isExistUnpaidTransactions) {
      this.props.status = ContractStatusVO.create(ContractStatus.COMPLETED);
    }
  }

  validate(): void {
    const { details, status, tenantId, apartmentRentPeriodType, landlordId, baseContractApartmentAdData } = this.props;

    const fields = [details, status, apartmentRentPeriodType, baseContractApartmentAdData];

    if (fields.some((f) => f == null)) {
      throw new ContractHasEmptyFieldsError('Contract must to have complete all required fields');
    }
    if (tenantId && tenantId.equals(landlordId)) {
      throw new ArgumentInvalidException('TenantId mut be not equals landlordId');
    }

    this.validateShortTermRent();
    this.validateLongTermRent();
    this.validatePeriod();
    this.validateCancellationPolicy();
    this.validateActiveRequiredFields();
    this.validateOffer();
    this.validatePermanentConcluded();
    this.validateTemporaryConcluded();
    this.validateInstantBooking();
  }

  private validateShortTermRent() {
    const { apartmentRentPeriodType, costAndCurrency, shortTermRentBookingType, shortTermRentPaymentType } = this.props;

    if (apartmentRentPeriodType !== ApartmentRentPeriodType.SHORT_TERM) {
      return;
    }

    if (!(SHORT_RENT_PERIOD_MIN_COST <= costAndCurrency.cost && costAndCurrency.cost <= SHORT_RENT_PERIOD_MAX_COST)) {
      throw new ArgumentOutOfRangeException(
        `Cost for short term must be between ${SHORT_RENT_PERIOD_MIN_COST} and ${SHORT_RENT_PERIOD_MAX_COST}`,
      );
    }
    if (!shortTermRentBookingType) {
      throw new ArgumentInvalidException('Rent booking type required for short term rent period');
    }
    if (!shortTermRentPaymentType) {
      throw new ArgumentInvalidException('Rent payment type required for short term rent period');
    }
  }

  validateLongTermRent() {
    const { apartmentRentPeriodType, costAndCurrency, shortTermRentBookingType, shortTermRentPaymentType } = this.props;

    if (apartmentRentPeriodType !== ApartmentRentPeriodType.LONG_TERM) {
      return;
    }

    if (!(LONG_RENT_PERIOD_MIN_COST <= costAndCurrency.cost && costAndCurrency.cost <= LONG_RENT_PERIOD_MAX_COST)) {
      throw new ArgumentOutOfRangeException(
        `Cost for long term must be between ${LONG_RENT_PERIOD_MIN_COST} and ${LONG_RENT_PERIOD_MAX_COST}`,
      );
    }
    if (shortTermRentBookingType) {
      throw new ArgumentInvalidException('Rent booking type available only for short term rent period');
    }
    if (shortTermRentPaymentType) {
      throw new ArgumentInvalidException('Rent payment type available only for short term rent period');
    }
  }

  private validatePeriod() {
    const { apartmentRentPeriodType, rentPeriodVersion } = this.props;
    const { arrivalDate, departureDate } = this.props.details;

    if (!rentPeriodVersion) {
      throw new IllegalOperationException('Contract must have rent period data');
    }

    // don't need validate by reason long term does not contain that fields
    if (!arrivalDate && !departureDate) {
      return;
    }

    // don't need validate by reason contract already canceled and in waiting departure of tenant
    if (this.props?.contractCancelation) {
      return;
    }

    if (!arrivalDate || !departureDate) {
      throw new ArgumentInvalidException('Arrival and departure date required');
    }

    const rentalDateGuard = new RentalDateGuard(rentPeriodVersion, this.props.status.value);

    const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType(
      {
        arrivalDate: arrivalDate.value,
        departureDate: departureDate.value,
      },
      apartmentRentPeriodType,
    );

    rentalDateGuard.validateOrThrowError(
      { arrivalDate: arrivalDate.value, departureDate: departureDate.value },
      paymentStrategyType,
    );
  }

  private validateCancellationPolicy() {
    const { apartmentRentPeriodType, cancellationPolicy } = this.props;

    if (
      apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM &&
      !cancellationPolicy.shortTermCancellationPolicy
    ) {
      throw new ArgumentInvalidException('Short term cancellation policy required');
    }
    if (
      apartmentRentPeriodType === ApartmentRentPeriodType.LONG_TERM &&
      !cancellationPolicy.longTermCancellationPolicy
    ) {
      throw new ArgumentInvalidException('Long term cancellation policy required');
    }
  }

  private validateActiveRequiredFields() {
    const { status, tenantId, landlordId, apartmentAdId } = this.props;

    if (status.value == ContractStatus.COMPLETED || status.value === ContractStatus.REJECTED) {
      return;
    }

    if (!tenantId) {
      throw new ContractHasEmptyFieldsError('Tenant id required');
    }
    if (!landlordId) {
      throw new ContractHasEmptyFieldsError('Landlord id required');
    }
    if (!apartmentAdId) {
      throw new ContractHasEmptyFieldsError('Apartment ad id required');
    }
  }

  private validateOffer() {
    const { status } = this.props;
    const { arrivalDate, departureDate, rules } = this.props.details;

    if (ContractStatus.OFFERING !== status.value) {
      return;
    }

    if (!arrivalDate) {
      throw new ContractHasEmptyFieldsError('Arrival date required');
    }
    if (!departureDate) {
      throw new ContractHasEmptyFieldsError('Departure date required');
    }
    if (!rules) {
      throw new ContractHasEmptyFieldsError('Rules required');
    }
  }

  private validatePermanentConcluded() {
    const { tenantPaymentMethod, status, isTemporary } = this.props;
    const { arrivalDate, departureDate, rules } = this.props.details;

    if (status.value !== ContractStatus.CONCLUDED || isTemporary) {
      return;
    }

    if (!arrivalDate) {
      throw new ContractHasEmptyFieldsError('Arrival date required');
    }
    if (!tenantPaymentMethod) {
      throw new ArgumentInvalidException('tenantPaymentMethod must be provided for permanent concluded contract');
    }
    if (!departureDate) {
      throw new ContractHasEmptyFieldsError('Departure date required');
    }
    if (!rules) {
      throw new ContractHasEmptyFieldsError('Rules required');
    }
  }

  private validateTemporaryConcluded() {
    const { tenantPaymentMethod, status, isTemporary, shortTermRentBookingType } = this.props;
    const { arrivalDate, departureDate, rules } = this.props.details;

    if (!isTemporary) {
      return;
    }

    // first case - base
    // second case - for booking instant temporary contract when contract send to nestjs/bull
    if (
      status.value !== ContractStatus.CONCLUDED &&
      !(shortTermRentBookingType?.value === ShortTermRentBookingType.INSTANT && status.value === ContractStatus.CREATED)
    ) {
      throw new ArgumentNotProvidedException(
        `Temporary contract exist only with status = ${ContractStatus.CONCLUDED}, or ${ContractStatus.CREATED} in instant booking process`,
      );
    }
    if (!arrivalDate) {
      throw new ContractHasEmptyFieldsError('Arrival date required');
    }
    if (tenantPaymentMethod) {
      throw new ArgumentInvalidException('tenantPaymentMethod must not be provided for temporary concluded contract');
    }
    if (!departureDate) {
      throw new ContractHasEmptyFieldsError('Departure date required');
    }
    if (!rules) {
      throw new ContractHasEmptyFieldsError('Rules required');
    }
  }

  private validateInstantBooking() {
    const { shortTermRentBookingType, tenantPaymentMethod, isTemporary } = this.props;

    if (shortTermRentBookingType?.value !== ShortTermRentBookingType.INSTANT) {
      return;
    }

    if (!tenantPaymentMethod && !isTemporary) {
      throw new ArgumentInvalidException('Tenant payment method required for instant booking');
    }
  }
}
