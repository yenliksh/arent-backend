import { UserComplaintEntity, UserComplaintProps } from '@domains/user-complaint/domain/entities/user-complaint.entity';
import { UserComplaintOrmEntity } from '@infrastructure/database/entities/user-complaint.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import { UserComplaintOrmMapper } from './user-complaint.orm-mapper';
import { UserComplaintRepositoryPort } from './user-complaint.repository.port';

@Injectable()
export class UserComplaintRepository
  extends ObjectionRepositoryBase<UserComplaintEntity, UserComplaintProps, UserComplaintOrmEntity>
  implements UserComplaintRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new UserComplaintOrmMapper(UserComplaintEntity));
  }

  async findOne(params: QueryParams<UserComplaintProps> = {}) {
    const where = this.prepareQuery(params);

    const found = await UserComplaintOrmEntity.query().findOne(where);

    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  async findMany(params: QueryParams<UserComplaintProps> = {}): Promise<UserComplaintEntity[]> {
    const where = this.prepareQuery(params);

    const found = await UserComplaintOrmEntity.query().where(where);

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i))) : [];
  }

  async findOneById(id: string): Promise<UserComplaintEntity | undefined> {
    const apartmentAdComplaint = await UserComplaintOrmEntity.query().findById(id);

    if (!apartmentAdComplaint) {
      return apartmentAdComplaint;
    }

    return this.mapper.toDomainEntity(apartmentAdComplaint);
  }

  async save(entity: UserComplaintEntity, trxId?: TransactionId): Promise<UUID> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await UserComplaintOrmEntity.startTransaction();

    try {
      const result = await UserComplaintOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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

  async delete(entity: UserComplaintEntity): Promise<UserComplaintEntity> {
    entity.validate();

    const trx = await UserComplaintOrmEntity.startTransaction();

    try {
      await UserComplaintOrmEntity.query(trx).delete().where('id', entity.id.value);

      await trx.commit();
      await trx.executionPromise;

      return entity;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }

  protected prepareQuery(params: QueryParams<UserComplaintProps>) {
    const where: DeepPartial<Omit<UserComplaintOrmEntity, keyof Model>> = {};

    if (params.senderUserId) {
      where.senderUserId = params.senderUserId.value;
    }
    if (params.recipientUserId) {
      where.recipientUserId = params.recipientUserId.value;
    }

    return where;
  }
}
