import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { PaymentTenantCancelationResponse } from '@domains/contract/base-classes/rental-cancelation-strategies/types';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { TenantContractCancelationInfoRequest } from './tenant-contract-cancelation-info.request';
export declare class TenantContractCancelationInfoService {
    private readonly contractRepository;
    private readonly paymentTransactionRepository;
    constructor(contractRepository: ContractRepository, paymentTransactionRepository: PaymentTransactionRepository);
    handle(dto: TenantContractCancelationInfoRequest, userId: UserOrmEntity['id']): Promise<PaymentTenantCancelationResponse<RentPeriodStrategyType.SHORT_TERM_RENT | RentPeriodStrategyType.MIDDLE_TERM_RENT | RentPeriodStrategyType.LONG_TERM_RENT>>;
}
