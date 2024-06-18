import { ContractEntity, ContractProps } from '@domains/contract/domain/entities/contract.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
export interface ContractRepositoryPort extends RepositoryPort<ContractEntity, ContractProps> {
    findOneByLandlordAndChatId(chatId: string, landlordId: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    findOneByTenantAndChatId(chatId: string, tenantId: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    findOneByMemberAndChatId(chatId: string, userId: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    checkApartmentIsFree(props: {
        apartmentAdId: string;
        apartmentRentPeriodType: ApartmentRentPeriodType;
        trxId?: TransactionId;
        from: string;
        to: string;
        selfContractId?: string;
    }): Promise<boolean>;
    findManyForReject(props: {
        apartmentAdId: string;
        apartmentRentPeriodType: ApartmentRentPeriodType;
        from?: string;
        to?: string;
        trxId?: TransactionId;
    }): Promise<ContractEntity[]>;
    findManyActiveContractsByUserId(userId: string): Promise<ContractEntity[]>;
    findOneActiveByCardId(tenantInnopayCardId: string): Promise<ContractEntity | undefined>;
    findOneByPaymentTransactionId(paymentTransactionId: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    findManyByPaymentTransactionIds(paymentTransactionIds: string[], trxId?: TransactionId): Promise<ContractEntity[]>;
    findByCustomerReference(customerReference: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
}
