import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { ContractRequestEntity, ContractRequestProps } from '../../domains/contract-request/domain/entities/contract-request.entity';
import { ContractRequestRepositoryPort } from './contract-request.repository.port';
export declare class ContractRequestRepository extends ObjectionRepositoryBase<ContractRequestEntity, ContractRequestProps, ContractRequestOrmEntity> implements ContractRequestRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<ContractRequestProps>, trxId?: TransactionId): Promise<ContractRequestEntity | undefined>;
    findMany(params?: QueryParams<ContractRequestProps>, trxId?: TransactionId): Promise<ContractRequestEntity[]>;
    findOneById(id: string, trxId?: TransactionId): Promise<ContractRequestEntity | undefined>;
    findOneByContractId(contractId: string, trxId?: TransactionId): Promise<ContractRequestEntity | undefined>;
    findOneForAccepting(id: string, landlordId: string, trxId?: TransactionId): Promise<ContractRequestEntity | undefined>;
    findOneWithUserId(id: string, userId: string, trxId?: TransactionId): Promise<ContractRequestEntity | undefined>;
    save(entity: ContractRequestEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: ContractRequestEntity, trxId?: TransactionId): Promise<ContractRequestEntity>;
    checkExist(props: {
        tenantId: string;
        apartmentAdId: string;
        arrivalDate?: string;
        departureDate?: string;
        apartmentRentPeriodType: ApartmentRentPeriodType;
    }, trxId?: TransactionId): Promise<boolean>;
    checkApartmentIsFree({ apartmentAdId, apartmentRentPeriodType, trxId, from, to, }: {
        apartmentAdId: string;
        apartmentRentPeriodType: ApartmentRentPeriodType;
        trxId?: TransactionId;
        from?: string;
        to?: string;
    }): Promise<boolean>;
    protected prepareQuery(params: QueryParams<ContractRequestProps>): DeepPartial<Omit<ContractRequestOrmEntity, keyof Model>>;
}
