import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { LongTermRentTenantCancelationStrategy } from '@domains/contract/base-classes/rental-cancelation-strategies/long-term-rent-cancelation-strategies/long-term-rent-tenant-cancelation.strategy';
import { MiddleTermRentTenantCancelationStrategy } from '@domains/contract/base-classes/rental-cancelation-strategies/middle-term-rent-cancelation-strategies/middle-term-rent-tenant-cancelation.strategy';
import { ShortTermRentTenantCancelationStrategy } from '@domains/contract/base-classes/rental-cancelation-strategies/short-term-rent-cancelation-strategies/short-term-rent-tenant-cancelation.strategy';
import { PaymentTenantCancelationResponse } from '@domains/contract/base-classes/rental-cancelation-strategies/types';
import { RentalDateGuard } from '@domains/contract/base-classes/rental-guards/rental-date.guard';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { DateUtil } from '@libs/utils/date-util';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { TenantContractCancelationInfoRequest } from './tenant-contract-cancelation-info.request';

@Injectable()
export class TenantContractCancelationInfoService {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
  ) {}

  async handle(
    dto: TenantContractCancelationInfoRequest,
    userId: UserOrmEntity['id'],
  ): Promise<
    PaymentTenantCancelationResponse<
      | RentPeriodStrategyType.SHORT_TERM_RENT
      | RentPeriodStrategyType.MIDDLE_TERM_RENT
      | RentPeriodStrategyType.LONG_TERM_RENT
    >
  > {
    const { id, checkoutDate } = dto;

    const contract = await this.contractRepository.findOne({ id: new UUID(id), tenantId: new UUID(userId) });

    // TODO: retrieve lat lng data for attach correct times to checkout date and convert to utc
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    if (!contract.isActive()) {
      throw new UnprocessableEntityException('Contract not active');
    }

    const hours = DateUtil.parse(contract.departureDateOrFail).hour();
    const minutes = DateUtil.parse(contract.departureDateOrFail).minute();

    const checkoutDateUtc = DateUtil.formatDateTimeTzToUtc(
      `${checkoutDate ?? DateUtil.now().tz(contract.timezone).format('YYYY-MM-DD')} ${hours}:${minutes}`,
      contract.timezone,
    ).toISOString();

    const transactions = await this.paymentTransactionRepository.findMany({ contractId: contract.id });

    // TODO: refactoring bellow code this will be allowed in future updates contract.generateCancelationData(transactions)
    const rentalDateGuard = new RentalDateGuard(contract.rentPeriodVersion, contract.status.value);
    const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
      arrivalDate: contract.arrivalDateOrFail,
      departureDate: contract.departureDateOrFail,
    });

    if (paymentStrategyType === RentPeriodStrategyType.SHORT_TERM_RENT) {
      const cancelationManager = new ShortTermRentTenantCancelationStrategy(contract, transactions);
      const result = cancelationManager.handle();

      return result;
    }

    if (paymentStrategyType === RentPeriodStrategyType.MIDDLE_TERM_RENT) {
      const cancelationManager = new MiddleTermRentTenantCancelationStrategy(contract, transactions);
      const result = cancelationManager.handle(checkoutDateUtc);

      return result;
    }

    if (paymentStrategyType === RentPeriodStrategyType.LONG_TERM_RENT) {
      const cancelationManager = new LongTermRentTenantCancelationStrategy(contract, transactions);
      const result = cancelationManager.handle(checkoutDateUtc);

      return result;
    }

    throw new UnprocessableEntityException(`PaymentStrategyType = ${paymentStrategyType} not provided`);
  }
}
