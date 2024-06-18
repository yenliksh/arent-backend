import { InnopayCardEntity, InnopayCardProps } from '@domains/innopay-card/domain/entities/innopay-card.entity';
import { InnopayAppointmentCardType } from '@domains/innopay-card/domain/types';
import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { InnopayUsersOrmEntity } from '@infrastructure/database/entities/innopay-users.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { InnopayCardRepositoryPort } from './innopay-card.repository.port';
export declare class InnopayCardRepository extends ObjectionRepositoryBase<InnopayCardEntity, InnopayCardProps, InnopayCardOrmEntity> implements InnopayCardRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<InnopayCardProps>, trxId?: TransactionId): Promise<InnopayCardEntity | undefined>;
    findMany(params?: QueryParams<InnopayCardProps>, trxId?: TransactionId): Promise<InnopayCardEntity[]>;
    findOneById(id: string, trxId?: TransactionId): Promise<InnopayCardEntity | undefined>;
    findManyByUserId(userId: string, trxId?: TransactionId): Promise<InnopayCardEntity[]>;
    isCardExist({ cardId, userId, appointmentType, }: {
        cardId: string;
        userId: string;
        appointmentType?: InnopayAppointmentCardType;
    }, trxId?: TransactionId): Promise<boolean>;
    save(entity: InnopayCardEntity, incomingTrxId?: TransactionId): Promise<UUID>;
    delete(entity: InnopayCardEntity, trxId?: TransactionId): Promise<InnopayCardEntity>;
    findCreditingInnopayUser(userId: string): Promise<InnopayUsersOrmEntity | undefined>;
    findCreditingInnopayUserByCnpUserId(cnpUserId: number): Promise<InnopayUsersOrmEntity | undefined>;
    saveInnopayUser(entity: Omit<InnopayUsersOrmEntity, keyof ObjectionEntityBase>): Promise<InnopayUsersOrmEntity>;
    protected prepareQuery(params: QueryParams<InnopayCardProps>): DeepPartial<Omit<InnopayCardOrmEntity, keyof Model>>;
}
