import { RentPeriodVersionOrmMapper } from '@domain-repositories/rent-period-version/rent-period-version.orm-mapper';
import { RentalDateGuard } from '@domains/contract/base-classes/rental-guards/rental-date.guard';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { ContractPaymentStatusType } from '@domains/contract/types';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ContractStatus, ShortTermRentPaymentType } from '@infrastructure/enums';
import { DateUtil } from '@libs/utils/date-util';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { TenantContractPaymentInfoRequest } from './tenant-contract-payment-info.request';

export interface TenantContractPaymentInfo {
  type: ContractPaymentStatusType;
  paidAmount: number;
  payableAmount: number;
  totalAmount: number;
  payableAmountOfNextCharge?: number;
  dateOfNextCharge?: Date;
  accommodationAvailableDate?: Date;
  refundsAmount: number;
  cancellationDate?: Date;
}

@Injectable()
export class TenantContractPaymentInfoService {
  async handle(dto: TenantContractPaymentInfoRequest, userId: UserOrmEntity['id']): Promise<TenantContractPaymentInfo> {
    const { id } = dto;

    const contractQuery = ContractOrmEntity.query()
      .findById(id)
      .where('tenantId', userId)
      .withGraphFetched({ rentPeriodVersion: true, contractCancelation: true });

    const transactionsQuery = PaymentTransactionOrmEntity.query().where('contractId', id);

    const [contract, transactions] = await Promise.all([contractQuery, transactionsQuery]);

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    if (!transactions.every((t) => t.contractId === contract.id)) {
      throw new NotFoundException("Transactions doesn't related with contract");
    }

    const contractCancelation = contract.contractCancelation;

    const paidAmount = transactions.reduce(
      (paidAmount, t) =>
        [PaymentTransactionStatus.CASH_OUT_WAITING, PaymentTransactionStatus.COMPLETED].includes(t.status)
          ? paidAmount + Number(t.totalAmountPayable)
          : paidAmount,
      0,
    );

    const payableAmount = transactions.reduce(
      (paidAmount, t) =>
        [PaymentTransactionStatus.CASH_IN_WAITING, PaymentTransactionStatus.CANCELED].includes(t.status)
          ? paidAmount + t.totalAmountPayable
          : paidAmount,
      0,
    );

    const totalAmount = transactions.reduce((paidAmount, t) => paidAmount + t.totalAmountPayable, 0);

    const { withdrawFundsDate: dateOfNextCharge, totalAmountPayable: payableAmountOfNextCharge } =
      [...transactions]
        .filter((t) => t.status === PaymentTransactionStatus.CASH_IN_WAITING)
        .sort((a, b) => (DateUtil.parseUTC(a.startDate).isBefore(b.startDate) ? -1 : 1))?.[0] || {};

    const { endDate: accommodationAvailableDate } =
      [...transactions]
        .filter((t) =>
          [PaymentTransactionStatus.CASH_OUT_WAITING, PaymentTransactionStatus.COMPLETED].includes(t.status),
        )
        .sort((a, b) => (DateUtil.parseUTC(a.startDate).isBefore(b.startDate) ? 1 : -1))?.[0] || {};

    const type = await this.defineContractPaymentStatusType(transactions, contract);

    const paymentInfo: TenantContractPaymentInfo = {
      type,
      paidAmount,
      payableAmount,
      totalAmount,
      dateOfNextCharge,
      payableAmountOfNextCharge,
      accommodationAvailableDate,
      refundsAmount: contractCancelation?.refundsAmountToSenderCost ?? 0,
      cancellationDate: contractCancelation?.createdAt,
    };

    return paymentInfo;
  }

  private async defineContractPaymentStatusType(
    transactions: PaymentTransactionOrmEntity[],
    contract: ContractOrmEntity,
  ): Promise<ContractPaymentStatusType> {
    const { apartmentRentPeriodType, rentPaymentType } = contract;

    if (contract.status === ContractStatus.REJECTED && !transactions.length) {
      return ContractPaymentStatusType.CANCELED;
    }

    if (contract.contractCancelation) {
      return ContractPaymentStatusType.REFUND;
    }

    const rentPeriodVersion = contract.rentPeriodVersion;

    if (!rentPeriodVersion) {
      throw new UnprocessableEntityException('Contract must be related with rent period version');
    }

    const arrivalDate = contract.arrivalDate?.toISOString();
    const departureDate = contract.departureDate?.toISOString();

    if (!arrivalDate || !departureDate) {
      throw new UnprocessableEntityException('Contract must have arrival and departure dates');
    }

    const mapper = new RentPeriodVersionOrmMapper(RentPeriodVersionEntity);
    const ormRentPeriodVersion = await mapper.toDomainEntity(rentPeriodVersion);

    const rentalDateGuard = new RentalDateGuard(ormRentPeriodVersion, contract.status);

    const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType(
      {
        arrivalDate,
        departureDate,
      },
      apartmentRentPeriodType,
    );

    if (
      ShortTermRentPaymentType.FULL === rentPaymentType &&
      paymentStrategyType === RentPeriodStrategyType.SHORT_TERM_RENT
    ) {
      return ContractPaymentStatusType.SHORT_FULL;
    }

    if (
      ShortTermRentPaymentType.PARTIAL === rentPaymentType &&
      paymentStrategyType === RentPeriodStrategyType.SHORT_TERM_RENT
    ) {
      return ContractPaymentStatusType.SHORT_PARTIAL;
    }

    if (
      [RentPeriodStrategyType.MIDDLE_TERM_RENT, RentPeriodStrategyType.LONG_TERM_RENT].includes(paymentStrategyType)
    ) {
      const isCompleted = transactions.every((t) =>
        [PaymentTransactionStatus.CASH_OUT_WAITING, PaymentTransactionStatus.COMPLETED].includes(t.status),
      );

      if (isCompleted) {
        return ContractPaymentStatusType.RECURRING_COMPLETED;
      }

      return ContractPaymentStatusType.RECURRING;
    }

    throw new UnprocessableEntityException('Payment status type is not defined');
  }
}
