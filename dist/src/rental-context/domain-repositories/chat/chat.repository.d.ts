import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { ChatEntity, ChatProps } from '../../domains/chat/domain/entities/chat.entity';
import { ChatRepositoryPort } from './chat.repository.port';
export declare class ChatRepository extends ObjectionRepositoryBase<ChatEntity, ChatProps, ChatOrmEntity> implements ChatRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<ChatProps>, trxId?: TransactionId): Promise<ChatEntity | undefined>;
    findMany(params?: QueryParams<ChatProps>, trxId?: TransactionId): Promise<ChatEntity[]>;
    findOneById(id: string, trxId?: TransactionId): Promise<ChatEntity | undefined>;
    findByIdAndMemberId(id: string, memberId: string, trxId?: TransactionId): Promise<ChatEntity | undefined>;
    findByContractIdAndMemberId(contractId: string, memberId: string, trxId?: TransactionId): Promise<ChatEntity | undefined>;
    findOneByContractId(contractId: string, trxId?: TransactionId): Promise<ChatEntity | undefined>;
    findOneByMessageAndMemberId(messageId: string, memberId: string, trxId?: TransactionId): Promise<ChatEntity | undefined>;
    save(entity: ChatEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: ChatEntity): Promise<ChatEntity>;
    protected prepareQuery(params: QueryParams<ChatProps>): DeepPartial<Omit<ChatOrmEntity, keyof Model>>;
}
