import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { ContractEntity, ContractProps } from '../../domains/contract/domain/entities/contract.entity';
import { ContractRepositoryPort } from './contract.repository.port';
export declare class ContractRepository extends ObjectionRepositoryBase<ContractEntity, ContractProps, ContractOrmEntity> implements ContractRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<ContractProps>, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    findMany(params?: QueryParams<ContractProps>): Promise<ContractEntity[]>;
    findCompletedPastContracts(): Promise<ContractEntity[]>;
    findOneByPaymentTransactionId(paymentTransactionId: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    findManyByPaymentTransactionIds(paymentTransactionIds: string[], trxId?: TransactionId): Promise<ContractEntity[]>;
    findOneById(id: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    findOneByLandlordAndChatId(chatId: string, landlordId: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    findOneByTenantAndChatId(chatId: string, tenantId: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    findOneByMemberAndChatId(chatId: string, userId: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    findManyForReject({ apartmentAdId, apartmentRentPeriodType, from, to, trxId, }: {
        apartmentAdId: string;
        apartmentRentPeriodType: ApartmentRentPeriodType;
        from?: string;
        to?: string;
        trxId?: TransactionId;
    }): Promise<ContractEntity[]>;
    findOneActiveByCardId(tenantInnopayCardId: string): Promise<ContractEntity | undefined>;
    findByCustomerReference(customerReference: string, trxId?: TransactionId): Promise<ContractEntity | undefined>;
    save(entity: ContractEntity, trxId?: TransactionId): Promise<UUID>;
    saveMany(entities: ContractEntity[], trxId?: TransactionId): Promise<UUID[]>;
    delete(entity: ContractEntity, trxId?: TransactionId): Promise<ContractEntity>;
    checkApartmentIsFree({ apartmentAdId, apartmentRentPeriodType, trxId, from, to, selfContractId, }: {
        apartmentAdId: string;
        apartmentRentPeriodType: ApartmentRentPeriodType;
        trxId?: TransactionId;
        from: string;
        to: string;
        selfContractId?: string;
    }): Promise<boolean>;
    findManyActiveContracts(apartmentAdId: string): Promise<never[] | ContractEntity[]>;
    findManyActiveContractsByUserId(userId: string, trxId?: TransactionId): Promise<ContractEntity[]>;
    protected prepareQuery(params: QueryParams<ContractProps>): DeepPartial<Omit<ContractOrmEntity, keyof Model>>;
    private intersectionDates;
}
