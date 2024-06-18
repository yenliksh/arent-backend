import {
  ReversingInnopayTransactionEntity,
  ReversingInnopayTransactionProps,
} from '@domains/innopay-transaction/domain/entities/reversing-innopay-transaction.entity';
import { ReversingInnopayTransactionOrmEntity } from '@infrastructure/database/entities/reversing-innopay-transaction.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import { ReversingInnopayTransactionOrmMapper } from './reversing-innopay-transaction.orm-mapper';
import { ReversingInnopayTransactionRepositoryPort } from './reversing-innopay-transaction.repository.port';

@Injectable()
export class ReversingInnopayTransactionRepository
  extends ObjectionRepositoryBase<
    ReversingInnopayTransactionEntity,
    ReversingInnopayTransactionProps,
    ReversingInnopayTransactionOrmEntity
  >
  implements ReversingInnopayTransactionRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new ReversingInnopayTransactionOrmMapper(ReversingInnopayTransactionEntity, unitOfWork));
  }

  async findOne(params: QueryParams<ReversingInnopayTransactionProps> = {}, trxId?: TransactionId) {
    const where = this.prepareQuery(params);
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await ReversingInnopayTransactionOrmEntity.query(trx).findOne(where);

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findMany(
    params: QueryParams<ReversingInnopayTransactionProps> = {},
  ): Promise<ReversingInnopayTransactionEntity[]> {
    const where = this.prepareQuery(params);

    const found = await ReversingInnopayTransactionOrmEntity.query().where(where);

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
  }

  async findOneById(id: string): Promise<ReversingInnopayTransactionEntity | undefined> {
    const found = await ReversingInnopayTransactionOrmEntity.query().findById(id);

    if (!found) {
      return found;
    }

    return this.mapper.toDomainEntity(found);
  }

  async findByCustomerReference(customerReference: string): Promise<ReversingInnopayTransactionEntity | undefined> {
    const found = await ReversingInnopayTransactionOrmEntity.query().findOne({ customerReference });

    if (!found) {
      return found;
    }

    return this.mapper.toDomainEntity(found);
  }

  async save(entity: ReversingInnopayTransactionEntity, trxId?: TransactionId): Promise<UUID> {
    entity.validate();
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ReversingInnopayTransactionOrmEntity.startTransaction();

    try {
      const result = await ReversingInnopayTransactionOrmEntity.query(trx).upsertGraph(
        await this.mapper.toOrmEntity(entity),
        {
          insertMissing: true,
        },
      );

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

  async delete(entity: ReversingInnopayTransactionEntity): Promise<ReversingInnopayTransactionEntity> {
    entity.validate();

    await ReversingInnopayTransactionOrmEntity.query().delete().where('id', entity.id.value);

    return entity;
  }

  protected prepareQuery(params: QueryParams<ReversingInnopayTransactionProps>) {
    const where: DeepPartial<Omit<ReversingInnopayTransactionOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }

    return where;
  }
}
