import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import { ChatEntity, ChatProps } from '../../domains/chat/domain/entities/chat.entity';
import { ChatOrmMapper } from './chat.orm-mapper';
import { ChatRepositoryPort } from './chat.repository.port';

@Injectable()
export class ChatRepository
  extends ObjectionRepositoryBase<ChatEntity, ChatProps, ChatOrmEntity>
  implements ChatRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new ChatOrmMapper(ChatEntity, unitOfWork));
  }

  async findOne(params: QueryParams<ChatProps> = {}, trxId?: TransactionId) {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const where = this.prepareQuery(params);

    const found = await ChatOrmEntity.query(trx).findOne(where).withGraphFetched({ members: true });

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findMany(params: QueryParams<ChatProps> = {}, trxId?: TransactionId): Promise<ChatEntity[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
    const where = this.prepareQuery(params);

    const found = await ChatOrmEntity.query(trx).where(where).withGraphFetched({ members: true });

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
  }

  async findOneById(id: string, trxId?: TransactionId): Promise<ChatEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const chat = await ChatOrmEntity.query(trx).findById(id).withGraphFetched({ members: true });

    if (!chat) {
      return chat;
    }

    return this.mapper.toDomainEntity(chat, trxId);
  }

  async findByIdAndMemberId(id: string, memberId: string, trxId?: TransactionId): Promise<ChatEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const chatMemberSubQuery = ChatMemberOrmEntity.query(trx).where({ memberId });
    const chat = await ChatMemberOrmEntity.relatedQuery('chat', trx).for(chatMemberSubQuery).findById(id);

    if (!chat) {
      return chat;
    }

    return this.mapper.toDomainEntity(chat, trxId);
  }

  async findByContractIdAndMemberId(
    contractId: string,
    memberId: string,
    trxId?: TransactionId,
  ): Promise<ChatEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const chatMemberSubQuery = ChatMemberOrmEntity.query(trx).where({ memberId });
    const chat = await ChatMemberOrmEntity.relatedQuery('chat', trx).for(chatMemberSubQuery).findOne({ contractId });

    if (!chat) {
      return chat;
    }

    return this.mapper.toDomainEntity(chat, trxId);
  }

  async findOneByContractId(contractId: string, trxId?: TransactionId): Promise<ChatEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const chat = await ChatOrmEntity.query(trx).findOne({ contractId }).withGraphFetched({ members: true });

    if (!chat) {
      return chat;
    }

    return this.mapper.toDomainEntity(chat, trxId);
  }

  async findOneByMessageAndMemberId(
    messageId: string,
    memberId: string,
    trxId?: TransactionId,
  ): Promise<ChatEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const messageSubQuery = MessageOrmEntity.query(trx).findById(messageId);
    const chat = await MessageOrmEntity.relatedQuery('chat', trx)
      .for(messageSubQuery)
      .innerJoinRelated({ members: true })
      .findOne('members.memberId', memberId);

    if (!chat) {
      return chat;
    }

    return this.mapper.toDomainEntity(chat, trxId);
  }

  async save(entity: ChatEntity, trxId?: TransactionId): Promise<UUID> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ChatOrmEntity.startTransaction();

    try {
      const result = await ChatOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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

  async delete(entity: ChatEntity): Promise<ChatEntity> {
    entity.validate();

    const trx = await ChatOrmEntity.startTransaction();

    try {
      await ChatOrmEntity.query(trx).delete().where('id', entity.id.value);

      await trx.commit();
      await trx.executionPromise;

      return entity;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }

  protected prepareQuery(params: QueryParams<ChatProps>) {
    const where: DeepPartial<Omit<ChatOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    if (params.contractId) {
      where.contractId = params.contractId.value;
    }
    return where;
  }
}
