import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { MessageEntity, MessageProps } from '../../domains/message/domain/entities/message.entity';
import { MessageRepositoryPort } from './message.repository.port';
export declare class MessageRepository extends ObjectionRepositoryBase<MessageEntity, MessageProps, MessageOrmEntity> implements MessageRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<MessageProps>): Promise<MessageEntity | undefined>;
    findMany(params?: QueryParams<MessageProps>): Promise<MessageEntity[]>;
    findOneById(id: string, trxId?: TransactionId): Promise<MessageEntity | undefined>;
    findLastForChat(chatId: string, trxId?: TransactionId): Promise<MessageEntity | undefined>;
    findLastOfferForChat(chatId: string, trxId?: TransactionId): Promise<MessageEntity | undefined>;
    findLastOfArray(messageIds: string[], trxId?: TransactionId): Promise<MessageEntity | undefined>;
    save(entity: MessageEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: MessageEntity): Promise<MessageEntity>;
    protected prepareQuery(params: QueryParams<MessageProps>): DeepPartial<Omit<MessageOrmEntity, keyof Model>>;
}
