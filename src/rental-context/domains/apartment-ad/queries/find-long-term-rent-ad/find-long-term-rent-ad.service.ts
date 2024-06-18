import { ApartmentAdStatusType } from '@domains/apartment-ad/domain/types';
import { TimeInterval } from '@domains/apartment-ad/types';
import { ContractRequestStatus } from '@domains/contract-request/domain/types';
import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { raw } from 'objection';

import { FindLongTermRentAdRequest } from './find-long-term-rent-ad.request';

type AverageResponseOnRequest = {
  average: TimeInterval;
};

export interface LongTermRentOrmEntityAndAverage {
  longTermRent: LongTermRentOrmEntity;
  averageResponseOnRequest: TimeInterval;
}

@Injectable()
export class FindLongTermRentAdService {
  async handle(
    dto: FindLongTermRentAdRequest,
    finderUserId?: string,
  ): Promise<LongTermRentOrmEntityAndAverage | undefined> {
    const { id } = dto;

    const longTermRentQueryBuilder = LongTermRentOrmEntity.query();

    if (finderUserId) {
      longTermRentQueryBuilder
        .withGraphFetched('apartmentAd.[contractRequests.[contract]]')
        .modifyGraph('apartmentAd.contractRequests', (builder) => {
          builder.where('tenantId', finderUserId);
          builder.whereNot('status', ContractRequestStatus.REJECTED);
        })
        .modifyGraph('apartmentAd.contractRequests.contract', (builder) => {
          builder.where('tenantId', finderUserId);
        });
    } else {
      longTermRentQueryBuilder.withGraphFetched('apartmentAd');
    }

    const longTermRent = await longTermRentQueryBuilder
      .findById(id)
      .where((builder) =>
        builder
          .where(`${LongTermRentOrmEntity.tableName}.status`, '@>', [ApartmentAdStatusType.PUBLISHED])
          .orWhere(`${LongTermRentOrmEntity.tableName}.status`, '@>', [ApartmentAdStatusType.PAUSED]),
      );

    if (!longTermRent) {
      throw new NotFoundException('Not found longTermRent');
    }

    const apartmentAdId = longTermRent.apartmentAdId;

    if (!apartmentAdId) {
      throw new NotFoundException('Not found apartmentAdId');
    }

    const [averageResponse] = (await ContractRequestOrmEntity.query()
      .select(raw(`avg( "updatedAt" - "createdAt" ) "average"`))
      .whereIn('status', [ContractRequestStatus.ACCEPTED, ContractRequestStatus.REJECTED])
      .andWhere(`apartmentAdId`, apartmentAdId)) as unknown as AverageResponseOnRequest[];

    return { longTermRent, averageResponseOnRequest: averageResponse.average };
  }

  async handleByApId(
    dto: FindLongTermRentAdRequest,
    finderUserId?: string,
  ): Promise<LongTermRentOrmEntityAndAverage | undefined> {
    const { id } = dto;

    const longTermRentQueryBuilder = LongTermRentOrmEntity.query();

    if (finderUserId) {
      longTermRentQueryBuilder
        .withGraphFetched('apartmentAd.[contractRequests.[contract]]')
        .modifyGraph('apartmentAd.contractRequests', (builder) => {
          builder.where('tenantId', finderUserId);
          builder.whereNot('status', ContractRequestStatus.REJECTED);
        })
        .modifyGraph('apartmentAd.contractRequests.contract', (builder) => {
          builder.where('tenantId', finderUserId);
        });
    } else {
      longTermRentQueryBuilder.withGraphFetched('apartmentAd');
    }

    const longTermRent = await longTermRentQueryBuilder
      .findOne({ apartmentAdId: id })
      .where((builder) =>
        builder
          .where(`${LongTermRentOrmEntity.tableName}.status`, '@>', [ApartmentAdStatusType.PUBLISHED])
          .orWhere(`${LongTermRentOrmEntity.tableName}.status`, '@>', [ApartmentAdStatusType.PAUSED]),
      );

    if (!longTermRent) {
      throw new NotFoundException('Not found longTermRent');
    }

    const apartmentAdId = longTermRent.apartmentAdId;

    if (!apartmentAdId) {
      throw new NotFoundException('Not found apartmentAdId');
    }

    const [averageResponse] = (await ContractRequestOrmEntity.query()
      .select(raw(`avg( "updatedAt" - "createdAt" ) "average"`))
      .whereIn('status', [ContractRequestStatus.ACCEPTED, ContractRequestStatus.REJECTED])
      .andWhere(`apartmentAdId`, apartmentAdId)) as unknown as AverageResponseOnRequest[];

    return { longTermRent, averageResponseOnRequest: averageResponse.average };
  }
}
