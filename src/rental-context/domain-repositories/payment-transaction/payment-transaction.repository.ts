import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import {
  PaymentTransactionEntity,
  PaymentTransactionProps,
} from '../../domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionOrmMapper } from './payment-transaction.orm-mapper';
import { PaymentTransactionRepositoryPort } from './payment-transaction.repository.port';

@Injectable()
export class PaymentTransactionRepository
  extends ObjectionRepositoryBase<PaymentTransactionEntity, PaymentTransactionProps, PaymentTransactionOrmEntity>
  implements PaymentTransactionRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new PaymentTransactionOrmMapper(PaymentTransactionEntity, unitOfWork));
  }

  async findOne(params: QueryParams<PaymentTransactionProps> = {}, trxId?: TransactionId) {
    const where = this.prepareQuery(params);

    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await PaymentTransactionOrmEntity.query(trx).findOne(where).withGraphFetched({ invoices: true });

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findMany(
    params: QueryParams<PaymentTransactionProps> = {},
    trxId?: TransactionId,
  ): Promise<PaymentTransactionEntity[]> {
    const where = this.prepareQuery(params);

    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await PaymentTransactionOrmEntity.query(trx).where(where).withGraphFetched({ invoices: true });

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
  }

  async findOneById(id: string, trxId?: TransactionId): Promise<PaymentTransactionEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await PaymentTransactionOrmEntity.query(trx).findById(id).withGraphFetched({ invoices: true });

    if (!found) {
      return found;
    }

    return this.mapper.toDomainEntity(found, trxId);
  }

  async findNextCashIn(contractId: string, trxId?: TransactionId): Promise<PaymentTransactionEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await PaymentTransactionOrmEntity.query(trx)
      .findOne({ contractId, status: PaymentTransactionStatus.CASH_IN_WAITING })
      .orderBy('withdrawFundsDate', 'ASC')
      .withGraphFetched({ invoices: true });

    if (!found) {
      return found;
    }

    return this.mapper.toDomainEntity(found, trxId);
  }

  async findActualCashInWaitingIds(trxId?: TransactionId): Promise<UUID[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const founds = await PaymentTransactionOrmEntity.query(trx)
      .where({ isRecurring: true })
      .where({ status: PaymentTransactionStatus.CASH_IN_WAITING })
      .where('withdrawFundsDate', '<', 'NOW()')
      .withGraphFetched({ contract: true }, { joinOperation: 'innerJoin' })
      .modifyGraph('contract', (builder) => builder.where({ isPending: false }))
      .select('id');

    if (!founds) {
      return founds;
    }

    return founds.map((found) => new UUID(found.id));
  }

  async findActualCashOutWaitingIds(trxId?: TransactionId): Promise<UUID[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const founds = await PaymentTransactionOrmEntity.query(trx)
      .where({ status: PaymentTransactionStatus.CASH_OUT_WAITING })
      .where((mainBuilder) => {
        mainBuilder
          .where((builder) => {
            builder.where({ isRecurring: true }).where('startDate', '<=', 'NOW()');
          })
          .orWhere((builder) => {
            builder
              .where({ isRecurring: false })
              .whereRaw(
                `"startDate" <= NOW() - INTERVAL '${PaymentTransactionEntity.CASH_OUT_AFTER_ARRIVAL_DAYS} day'`,
              );
          });
      })
      .withGraphFetched({ contract: true }, { joinOperation: 'innerJoin' })
      .modifyGraph('contract', (builder) => builder.where({ isPending: false }))
      .select('id');

    if (!founds) {
      return founds;
    }

    return founds.map((found) => new UUID(found.id));
  }

  async findContractFirstPayment(
    contractId: string,
    trxId?: TransactionId,
  ): Promise<PaymentTransactionEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await PaymentTransactionOrmEntity.query(trx).findOne({ isRecurring: false, contractId });

    if (!found) {
      return found;
    }

    return this.mapper.toDomainEntity(found, trxId);
  }

  async save(entity: PaymentTransactionEntity, trxId?: TransactionId): Promise<UUID> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await PaymentTransactionOrmEntity.startTransaction();

    try {
      const result = await PaymentTransactionOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
        insertMissing: true,
        noDelete: true,
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

  async delete(entity: PaymentTransactionEntity, trxId?: TransactionId): Promise<PaymentTransactionEntity> {
    entity.validate();

    const [trx, isOwnTrx] = trxId
      ? [this.unitOfWork.getTrx(trxId), false]
      : [await PaymentTransactionOrmEntity.startTransaction(), true];

    try {
      await PaymentTransactionOrmEntity.query(trx).delete().where('id', entity.id.value);

      if (isOwnTrx) {
        await trx.commit();
        await trx.executionPromise;
      }

      return entity;
    } catch (err) {
      if (isOwnTrx) {
        await trx.rollback();
      }
      throw err;
    }
  }

  async deleteByContractId(contractId: string, trxId?: TransactionId): Promise<void> {
    const [trx, isOwnTrx] = trxId
      ? [this.unitOfWork.getTrx(trxId), false]
      : [await PaymentTransactionOrmEntity.startTransaction(), true];

    try {
      const paymentTransactionSubQuery = PaymentTransactionOrmEntity.query(trx).where({ contractId });
      await PaymentTransactionOrmEntity.relatedQuery('invoices', trx).for(paymentTransactionSubQuery).delete();

      await PaymentTransactionOrmEntity.query(trx).delete().where({ contractId });

      if (isOwnTrx) {
        await trx.commit();
        await trx.executionPromise;
      }
    } catch (err) {
      if (isOwnTrx) {
        await trx.rollback();
      }
      throw err;
    }
  }

  protected prepareQuery(params: QueryParams<PaymentTransactionProps>) {
    const where: DeepPartial<Omit<PaymentTransactionOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    if (params.contractId) {
      where.contractId = params.contractId.value;
    }
    if (params.status) {
      where.status = params.status;
    }
    if (params.withdrawFundsDate) {
      where.withdrawFundsDate = params.withdrawFundsDate.value;
    }
    if (params.totalAmountPayable) {
      where.totalAmountPayable = params.totalAmountPayable.cost;
    }
    return where;
  }
}
