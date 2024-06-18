import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Injectable } from '@nestjs/common';
import { Model } from 'objection';

import { ApartmentAdEntity } from '../../domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ApartmentAdProps } from '../../domains/apartment-ad/domain/entities/apartment-ad.types';
import { RentPeriodType } from '../../domains/apartment-ad/domain/types';
import { ApartmentAdOrmMapper } from './apartment-ad.orm-mapper';
import { ApartmentAdRepositoryPort } from './apartment-ad.repository.port';

@Injectable()
export class ApartmentAdRepository
  extends ObjectionRepositoryBase<ApartmentAdEntity, ApartmentAdProps, ApartmentAdOrmEntity>
  implements ApartmentAdRepositoryPort
{
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(new ApartmentAdOrmMapper(ApartmentAdEntity, unitOfWork));
  }

  async findOne(params: QueryParams<ApartmentAdProps> = {}, trxId?: TransactionId) {
    const where = this.prepareQuery(params);

    const found = await ApartmentAdOrmEntity.query()
      .findOne(where)
      .withGraphFetched({ longTermRent: true, shortTermRent: true });

    return found ? this.mapper.toDomainEntity(found, trxId) : undefined;
  }

  async findMany(params: QueryParams<ApartmentAdProps> = {}, trxId?: TransactionId): Promise<ApartmentAdEntity[]> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const where = this.prepareQuery(params);

    const found = await ApartmentAdOrmEntity.query(trx)
      .where(where)
      .withGraphFetched({ longTermRent: true, shortTermRent: true });

    return found.length ? Promise.all(found.map(async (i) => await this.mapper.toDomainEntity(i, trxId))) : [];
  }

  async findOneById(id: string, trxId?: TransactionId): Promise<ApartmentAdEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const apartmentAd = await ApartmentAdOrmEntity.query(trx)
      .findById(id)
      .withGraphFetched({ longTermRent: true, shortTermRent: true });

    if (!apartmentAd) {
      return apartmentAd;
    }

    return this.mapper.toDomainEntity(apartmentAd, trxId);
  }

  async findWithAvailable(
    id: string,
    rentPeriodType: ApartmentRentPeriodType,
    arrivalDate?: string,
    departureDate?: string,
    trxId?: TransactionId,
  ): Promise<ApartmentAdEntity | undefined> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : undefined;

    const apartmentAdQb = ApartmentAdOrmEntity.query(trx)
      .findById(id)
      .where((builder) => builder.where({ rentPeriodType }).orWhere({ rentPeriodType: RentPeriodType.ALL }))
      .withGraphFetched({ longTermRent: true, shortTermRent: true });

    if (rentPeriodType === ApartmentRentPeriodType.SHORT_TERM) {
      if (!arrivalDate || !departureDate) {
        return;
      }

      apartmentAdQb
        .innerJoinRelated({ shortTermRent: true })
        .whereRaw(`DATE_PART('year', age('${departureDate}'::date, NOW())) < 1`)
        .whereRaw(`DATE_PART('month', age('${departureDate}'::date, NOW())) < "shortTermRent"."bookingAccessInMonths"`);

      const lockedDatesSubQuery = ShortTermRentLockedDateOrmEntity.query(trx)
        .whereRaw(`(DATE '${arrivalDate}', DATE '${departureDate}') OVERLAPS ("startDate"::date, "endDate"::date)`)
        .orWhere({ startDate: departureDate })
        .orWhere({ endDate: arrivalDate });
      const lockedShortTermRent = await ShortTermRentLockedDateOrmEntity.relatedQuery('shortTermRent', trx)
        .for(lockedDatesSubQuery)
        .findOne({ apartmentAdId: id });

      if (lockedShortTermRent) {
        return;
      }
    }

    const apartmentAd = await apartmentAdQb;

    if (!apartmentAd) {
      return apartmentAd;
    }

    return this.mapper.toDomainEntity(apartmentAd, trxId);
  }

  async save(entity: ApartmentAdEntity, trxId?: TransactionId): Promise<UUID> {
    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ApartmentAdOrmEntity.startTransaction();

    try {
      const result = await ApartmentAdOrmEntity.query(trx).upsertGraph(await this.mapper.toOrmEntity(entity), {
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

  async delete(entity: ApartmentAdEntity, trxId?: TransactionId): Promise<ApartmentAdEntity> {
    entity.validate();

    const trx = trxId ? this.unitOfWork.getTrx(trxId) : await ApartmentAdOrmEntity.startTransaction();

    try {
      await ApartmentAdOrmEntity.query(trx).delete().where('id', entity.id.value);

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

  protected prepareQuery(params: QueryParams<ApartmentAdProps>) {
    const where: DeepPartial<Omit<ApartmentAdOrmEntity, keyof Model>> = {};

    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    if (params.landlordId) {
      where.landlordId = params.landlordId.value;
    }
    if (params.rentPeriodType) {
      where.rentPeriodType = params.rentPeriodType.value;
    }
    if (params.paymentMethod?.innopayCardId) {
      where.innopayCardId = params.paymentMethod.innopayCardId;
    }

    return where;
  }
}
