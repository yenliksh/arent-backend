import { RentPeriodVersionOrmEntity } from '@infrastructure/database/entities/rent-period-version.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import {
  RentPeriodVersionEntity,
  RentPeriodVersionProps,
} from '../../domains/rent-period-version/domain/rent-period-version.entity';
import { RentPeriodVersionOrmMapper } from './rent-period-version.orm-mapper';
import { RentPeriodVersionRepositoryPort } from './rent-period-version.repository.port';

@Injectable()
export class RentPeriodVersionRepository
  extends ObjectionRepositoryBase<RentPeriodVersionEntity, RentPeriodVersionProps, RentPeriodVersionOrmEntity>
  implements RentPeriodVersionRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new RentPeriodVersionOrmMapper(RentPeriodVersionEntity, unitOfWork));
  }

  async findOne(params: QueryParams<RentPeriodVersionProps> = {}, trxId?: TransactionId) {
    const where = this.prepareQuery(params);
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const found = await RentPeriodVersionOrmEntity.query(trx).findOne(where);

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findMany(params: QueryParams<RentPeriodVersionProps> = {}): Promise<RentPeriodVersionEntity[]> {
    const where = this.prepareQuery(params);

    const found = await RentPeriodVersionOrmEntity.query().where(where);

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
  }

  async findOneById(id: string): Promise<RentPeriodVersionEntity | undefined> {
    const rentPeriodVersion = await RentPeriodVersionOrmEntity.query().findById(id);

    if (!rentPeriodVersion) {
      return rentPeriodVersion;
    }

    return this.mapper.toDomainEntity(rentPeriodVersion);
  }

  async findLast(trxId?: TransactionId): Promise<RentPeriodVersionEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const lastRentPeriodVersion = await RentPeriodVersionOrmEntity.query(trx)
      .orderBy([{ column: 'version', order: 'DESC' }])
      .limit(1)
      .first();

    if (!lastRentPeriodVersion) {
      return lastRentPeriodVersion;
    }

    return this.mapper.toDomainEntity(lastRentPeriodVersion, trxId);
  }

  async save(entity: RentPeriodVersionEntity, trxId?: TransactionId): Promise<UUID> {
    entity.validate();
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await RentPeriodVersionOrmEntity.startTransaction();

    try {
      const result = await RentPeriodVersionOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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

  async delete(entity: RentPeriodVersionEntity): Promise<RentPeriodVersionEntity> {
    entity.validate();

    await RentPeriodVersionOrmEntity.query().delete().where('id', entity.id.value);

    return entity;
  }

  protected prepareQuery(params: QueryParams<RentPeriodVersionProps>) {
    const where: DeepPartial<Omit<RentPeriodVersionOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    if (params.version) {
      where.version = params.version;
    }

    return where;
  }
}
