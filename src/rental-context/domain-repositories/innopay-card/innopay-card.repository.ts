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
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import { InnopayCardOrmMapper } from './innopay-card.orm-mapper';
import { InnopayCardRepositoryPort } from './innopay-card.repository.port';

@Injectable()
export class InnopayCardRepository
  extends ObjectionRepositoryBase<InnopayCardEntity, InnopayCardProps, InnopayCardOrmEntity>
  implements InnopayCardRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new InnopayCardOrmMapper(InnopayCardEntity, unitOfWork));
  }

  async findOne(params: QueryParams<InnopayCardProps> = {}, trxId?: TransactionId) {
    const where = this.prepareQuery(params);
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await InnopayCardOrmEntity.query(trx).findOne(where).withGraphFetched({ innopayUser: true });

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findMany(params: QueryParams<InnopayCardProps> = {}, trxId?: TransactionId): Promise<InnopayCardEntity[]> {
    const where = this.prepareQuery(params);
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await InnopayCardOrmEntity.query(trx).where(where).withGraphFetched({ innopayUser: true });

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
  }

  async findOneById(id: string, trxId?: TransactionId): Promise<InnopayCardEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const card = await InnopayCardOrmEntity.query(trx).findById(id);

    if (!card) {
      return card;
    }

    return this.mapper.toDomainEntity(card, trxId);
  }

  async findManyByUserId(userId: string, trxId?: TransactionId): Promise<InnopayCardEntity[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await InnopayCardOrmEntity.query(trx)
      .withGraphFetched({ innopayUser: true }, { joinOperation: 'innerJoin' })
      .modifyGraph('innopayUser', (builder) => {
        builder.where('userId', userId);
      });

    return found.length
      ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId)))
      : ([] as InnopayCardEntity[]);
  }

  async isCardExist(
    {
      cardId,
      userId,
      appointmentType,
    }: { cardId: string; userId: string; appointmentType?: InnopayAppointmentCardType },
    trxId?: TransactionId,
  ): Promise<boolean> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const foundCardQuery = InnopayCardOrmEntity.query(trx)
      .findById(cardId)
      .joinRelated('innopayUser')
      .where('innopayUser.userId', userId);

    if (appointmentType) {
      foundCardQuery.where('appointmentType', appointmentType);
    }

    const foundCard = await foundCardQuery;

    return !!foundCard;
  }

  async save(entity: InnopayCardEntity, incomingTrxId?: TransactionId): Promise<UUID> {
    entity.validate();

    const [trxId, isOwnTrx] = incomingTrxId ? [incomingTrxId, false] : [await this.unitOfWork.start(), true];
    const trx = this.unitOfWork.getTrx(trxId);

    try {
      const result = await InnopayCardOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity, trxId), {
        insertMissing: true,
      });

      if (isOwnTrx) {
        await this.unitOfWork.commit(trxId);
      }

      return new UUID(result.id);
    } catch (err) {
      if (isOwnTrx) {
        await this.unitOfWork.rollback(trxId);
      }
      throw err;
    }
  }

  async delete(entity: InnopayCardEntity, trxId?: TransactionId): Promise<InnopayCardEntity> {
    entity.validate();

    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await InnopayCardOrmEntity.startTransaction();

    try {
      await InnopayCardOrmEntity.query(trx).delete().where('id', entity.id.value);

      if (!trxId) {
        await trx.commit();
        await trx.executionPromise;
      }

      return entity;
    } catch (err) {
      if (!trxId) {
        await trx.rollback();
      }
      throw err;
    }
  }

  async findCreditingInnopayUser(userId: string) {
    const query = InnopayUsersOrmEntity.query().findOne({ userId, isCrediting: true });

    return query;
  }

  async findCreditingInnopayUserByCnpUserId(cnpUserId: number) {
    const query = InnopayUsersOrmEntity.query().findOne({ cnpUserId, isCrediting: true });

    return query;
  }

  async saveInnopayUser(entity: Omit<InnopayUsersOrmEntity, keyof ObjectionEntityBase>) {
    const trx = await InnopayUsersOrmEntity.startTransaction();

    try {
      const result = await InnopayUsersOrmEntity.query(trx).insert(entity);

      await trx.commit();
      await trx.executionPromise;

      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }

  protected prepareQuery(params: QueryParams<InnopayCardProps>) {
    const where: DeepPartial<Omit<InnopayCardOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    return where;
  }
}
