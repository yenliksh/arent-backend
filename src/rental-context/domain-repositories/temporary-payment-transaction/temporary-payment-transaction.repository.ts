import {
  TemporaryPaymentTransactionEntity,
  TemporaryPaymentTransactionProps,
} from '@domains/temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity';
import { TemporaryPaymentTransactionOrmEntity } from '@infrastructure/database/entities/temporary-payment-transaction.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import { TemporaryPaymentTransactionOrmMapper } from './temporary-payment-transaction.orm-mapper';
import { TemporaryPaymentTransactionRepositoryPort } from './temporary-payment-transaction.repository.port';

@Injectable()
export class TemporaryPaymentTransactionRepository
  extends ObjectionRepositoryBase<
    TemporaryPaymentTransactionEntity,
    TemporaryPaymentTransactionProps,
    TemporaryPaymentTransactionOrmEntity
  >
  implements TemporaryPaymentTransactionRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new TemporaryPaymentTransactionOrmMapper(TemporaryPaymentTransactionEntity, unitOfWork));
  }

  async findOne(params: QueryParams<TemporaryPaymentTransactionProps> = {}) {
    const where = this.prepareQuery(params);

    const found = await TemporaryPaymentTransactionOrmEntity.query().findOne(where);

    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findMany(
    params: QueryParams<TemporaryPaymentTransactionProps> = {},
  ): Promise<TemporaryPaymentTransactionEntity[]> {
    const where = this.prepareQuery(params);

    const found = await TemporaryPaymentTransactionOrmEntity.query().where(where);

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
  }

  async findByContractId(contractId: string, trxId?: string | undefined): Promise<TemporaryPaymentTransactionEntity[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await TemporaryPaymentTransactionOrmEntity.query(trx).where({ contractId });

    return Promise.all(found.map((i) => this.mapper.toDomainEntity(i, trxId)));
  }

  async findOneById(id: string, trxId?: TransactionId): Promise<TemporaryPaymentTransactionEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;
    const found = await TemporaryPaymentTransactionOrmEntity.query(trx).findById(id);

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async save(entity: TemporaryPaymentTransactionEntity, trxId?: TransactionId): Promise<UUID> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await TemporaryPaymentTransactionOrmEntity.startTransaction();

    try {
      const result = await TemporaryPaymentTransactionOrmEntity.query(trx).upsertGraph(
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

  async delete(
    entity: TemporaryPaymentTransactionEntity,
    trxId?: TransactionId,
  ): Promise<TemporaryPaymentTransactionEntity> {
    entity.validate();

    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await TemporaryPaymentTransactionOrmEntity.startTransaction();

    try {
      await TemporaryPaymentTransactionOrmEntity.query(trx).delete().where('id', entity.id.value);

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

  protected prepareQuery(params: QueryParams<TemporaryPaymentTransactionProps>) {
    const where: DeepPartial<Omit<TemporaryPaymentTransactionOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }

    return where;
  }
}
