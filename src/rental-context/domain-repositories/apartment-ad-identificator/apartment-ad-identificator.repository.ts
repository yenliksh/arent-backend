import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdIdentificatorProps } from '@domains/apartment-ad/domain/entities/apartment-ad.types';
import { ApartmentAdIdentificatorOrmEntity } from '@infrastructure/database/entities/apartment-ad-identificator.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import { ApartmentAdIdentificatorOrmMapper } from './apartment-ad-identificator.orm-mapper';
import { ApartmentAdIdentificatorRepositoryPort } from './apartment-ad-identificator.repository.port';

@Injectable()
export class ApartmentAdIdentificatorRepository
  extends ObjectionRepositoryBase<
    ApartmentAdIdentificatorEntity,
    ApartmentAdIdentificatorProps,
    ApartmentAdIdentificatorOrmEntity
  >
  implements ApartmentAdIdentificatorRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new ApartmentAdIdentificatorOrmMapper(ApartmentAdIdentificatorEntity, unitOfWork));
  }

  async save(entity: ApartmentAdIdentificatorEntity, trxId?: TransactionId): Promise<UUID> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ApartmentAdIdentificatorOrmEntity.startTransaction();

    try {
      const result = await ApartmentAdIdentificatorOrmEntity.query(trx).upsertGraph(
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

  async findOne(params: QueryParams<ApartmentAdIdentificatorProps> = {}, trxId?: TransactionId) {
    const where = this.prepareQuery(params);

    const found = await ApartmentAdIdentificatorOrmEntity.query()
      .findOne(where)
      .withGraphFetched({ longTermRent: true, shortTermRent: true });

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findMany(
    params: QueryParams<ApartmentAdIdentificatorProps> = {},
    trxId?: TransactionId,
  ): Promise<ApartmentAdIdentificatorEntity[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const where = this.prepareQuery(params);

    const found = await ApartmentAdIdentificatorOrmEntity.query(trx)
      .where(where)
      .withGraphFetched({ longTermRent: true, shortTermRent: true });

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
  }

  async findOneById(id: string): Promise<ApartmentAdIdentificatorEntity | undefined> {
    const apartmentAd = await ApartmentAdIdentificatorOrmEntity.query().findOne({ id });

    if (!apartmentAd) {
      return apartmentAd;
    }

    return this.mapper.toDomainEntity(apartmentAd);
  }

  async findOneBySearchId(id: string): Promise<ApartmentAdIdentificatorEntity | undefined> {
    const apartmentAd = await ApartmentAdIdentificatorOrmEntity.query().findOne({ adSearchId: id });

    if (!apartmentAd) {
      return apartmentAd;
    }

    return this.mapper.toDomainEntity(apartmentAd);
  }

  async findOneByApartmentId(id: string): Promise<ApartmentAdIdentificatorEntity | undefined> {
    const apartmentAd = await ApartmentAdIdentificatorOrmEntity.query().findOne({ apartmentId: id });

    if (!apartmentAd) {
      return;
    }

    return this.mapper.toDomainEntity(apartmentAd);
  }

  async findByApartmentId(id: string): Promise<ApartmentAdIdentificatorEntity[] | undefined> {
    const apartmentAds = await ApartmentAdIdentificatorOrmEntity.query().where({ apartmentId: id });

    if (!apartmentAds) {
      return;
    }

    const result = <ApartmentAdIdentificatorEntity[]>[];

    apartmentAds.forEach((ap) => {
      this.mapper.toDomainEntity(ap).then((el) => {
        result.push(el);
      });
    });

    return result;
  }

  async findManyByApartmentIds(ids: string[]): Promise<ApartmentAdIdentificatorOrmEntity[] | undefined> {
    const apartmentAds: ApartmentAdIdentificatorOrmEntity[] = [];

    ids.forEach(async (id) => {
      const apAd = await ApartmentAdIdentificatorOrmEntity.query().findOne({ apartmentId: id });
      if (!apAd) return;
      apartmentAds.push(apAd);
    });

    return apartmentAds;
  }

  async updateByApartmentId(id: string, titleSeo?: string, slug?: string): Promise<boolean | undefined> {
    const apartmentAd = await ApartmentAdIdentificatorOrmEntity.query()
      .update({ titleSeo, slug })
      .where({ apartmentId: id });

    if (!apartmentAd) {
      return;
    }

    return true;
  }

  async delete(entity: ApartmentAdIdentificatorEntity, trxId?: TransactionId): Promise<ApartmentAdIdentificatorEntity> {
    entity.validate();

    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ApartmentAdIdentificatorOrmEntity.startTransaction();

    try {
      await ApartmentAdIdentificatorOrmEntity.query(trx).delete().where('id', entity.id.value);

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

  async deleteByApartmentId(id: string): Promise<boolean | undefined> {
    const apartmentAd = await ApartmentAdIdentificatorOrmEntity.query().delete().where({ apartmentId: id });

    if (!apartmentAd) {
      return;
    }

    return true;
  }

  async deleteAll(): Promise<boolean | undefined> {
    await ApartmentAdIdentificatorOrmEntity.query().delete().where({});

    return true;
  }

  protected prepareQuery(params: QueryParams<ApartmentAdIdentificatorProps>) {
    const where: DeepPartial<Omit<ApartmentAdIdentificatorOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }

    if (params.apartmentId) {
      where.apartmentId = params.apartmentId.value;
    }

    return where;
  }
}
