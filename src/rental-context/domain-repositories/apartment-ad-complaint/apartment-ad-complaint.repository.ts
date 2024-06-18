import {
  ApartmentAdComplaintEntity,
  ComplaintProps,
} from '@domains/apartment-ad-complaint/domain/entities/apartment-ad-complaint.entity';
import { ApartmentAdComplaintOrmEntity } from '@infrastructure/database/entities/apartment-ad-complaint.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import { ApartmentAdComplaintOrmMapper } from './apartment-ad-complaint.orm-mapper';
import { ApartmentAdComplaintRepositoryPort } from './apartment-ad-complaint.repository.port';

@Injectable()
export class ApartmentAdComplaintRepository
  extends ObjectionRepositoryBase<ApartmentAdComplaintEntity, ComplaintProps, ApartmentAdComplaintOrmEntity>
  implements ApartmentAdComplaintRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new ApartmentAdComplaintOrmMapper(ApartmentAdComplaintEntity, unitOfWork));
  }

  async findOne(params: QueryParams<ComplaintProps> = {}) {
    const where = this.prepareQuery(params);

    const found = await ApartmentAdComplaintOrmEntity.query().findOne(where);

    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findMany(params: QueryParams<ComplaintProps> = {}): Promise<ApartmentAdComplaintEntity[]> {
    const where = this.prepareQuery(params);

    const found = await ApartmentAdComplaintOrmEntity.query().where(where);

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
  }

  async findOneById(id: string): Promise<ApartmentAdComplaintEntity | undefined> {
    const apartmentAdComplaint = await ApartmentAdComplaintOrmEntity.query().findById(id);

    if (!apartmentAdComplaint) {
      return apartmentAdComplaint;
    }

    return this.mapper.toDomainEntity(apartmentAdComplaint);
  }

  async save(entity: ApartmentAdComplaintEntity, trxId?: TransactionId): Promise<UUID> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ApartmentAdComplaintOrmEntity.startTransaction();

    try {
      const result = await ApartmentAdComplaintOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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

  async delete(entity: ApartmentAdComplaintEntity): Promise<ApartmentAdComplaintEntity> {
    entity.validate();

    const trx = await ApartmentAdComplaintOrmEntity.startTransaction();

    try {
      await ApartmentAdComplaintOrmEntity.query(trx).delete().where('id', entity.id.value);

      await trx.commit();
      await trx.executionPromise;

      return entity;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }

  protected prepareQuery(params: QueryParams<ComplaintProps>) {
    const where: DeepPartial<Omit<ApartmentAdComplaintOrmEntity, keyof Model>> = {};

    if (params.userId) {
      where.userId = params.userId.value;
    }
    if (params.apartmentAdId) {
      where.apartmentAdId = params.apartmentAdId.value;
    }

    return where;
  }
}
