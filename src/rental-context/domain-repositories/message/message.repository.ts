import { MessageType, SystemMessageType } from '@domains/message/domain/types';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import { MessageEntity, MessageProps } from '../../domains/message/domain/entities/message.entity';
import { MessageOrmMapper } from './message.orm-mapper';
import { MessageRepositoryPort } from './message.repository.port';

@Injectable()
export class MessageRepository
  extends ObjectionRepositoryBase<MessageEntity, MessageProps, MessageOrmEntity>
  implements MessageRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new MessageOrmMapper(MessageEntity, unitOfWork));
  }

  async findOne(params: QueryParams<MessageProps> = {}) {
    const where = this.prepareQuery(params);

    const found = await MessageOrmEntity.query().findOne(where);

    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findMany(params: QueryParams<MessageProps> = {}): Promise<MessageEntity[]> {
    const where = this.prepareQuery(params);

    const found = await MessageOrmEntity.query().where(where);

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
  }

  async findOneById(id: string, trxId?: TransactionId): Promise<MessageEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const message = await MessageOrmEntity.query(trx).findById(id);

    if (!message) {
      return message;
    }

    return this.mapper.toDomainEntity(message, trxId);
  }

  async findLastForChat(chatId: string, trxId?: TransactionId): Promise<MessageEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const message = await MessageOrmEntity.query(trx).where({ chatId }).orderBy('createdAt', 'DESC').limit(1).first();

    if (!message) {
      return message;
    }

    return this.mapper.toDomainEntity(message, trxId);
  }

  async findLastOfferForChat(chatId: string, trxId?: TransactionId): Promise<MessageEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const message = await MessageOrmEntity.query(trx)
      .where({ chatId, type: MessageType.SYSTEM, systemMessageType: SystemMessageType.OFFER_SENDING })
      .orderBy('createdAt', 'DESC')
      .limit(1)
      .first();

    if (!message) {
      return message;
    }

    return this.mapper.toDomainEntity(message, trxId);
  }

  async findLastOfArray(messageIds: string[], trxId?: TransactionId): Promise<MessageEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const message = await MessageOrmEntity.query(trx)
      .findByIds(messageIds)
      .orderBy('createdAt', 'DESC')
      .limit(1)
      .first();

    if (!message) {
      return message;
    }

    return this.mapper.toDomainEntity(message, trxId);
  }

  async save(entity: MessageEntity, trxId?: TransactionId): Promise<UUID> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await MessageOrmEntity.startTransaction();

    try {
      const result = await MessageOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
        insertMissing: true,
      });

      if (!trxId) {
        await trx.commit();
        await trx.executionPromise;
      }

      return new UUID(result.id);
    } catch (err) {
      if (!trxId) {
        await trx.rollback();
      }
      throw err;
    }
  }

  async delete(entity: MessageEntity): Promise<MessageEntity> {
    entity.validate();
    await MessageOrmEntity.query().delete().where('id', entity.id.value);

    return entity;
  }

  protected prepareQuery(params: QueryParams<MessageProps>) {
    const where: DeepPartial<Omit<MessageOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    if (params.chatId) {
      where.chatId = params.chatId.value;
    }
    if (params.senderId) {
      where.senderId = params.senderId.value;
    }
    if (params.type) {
      where.type = params.type;
    }
    return where;
  }
}
