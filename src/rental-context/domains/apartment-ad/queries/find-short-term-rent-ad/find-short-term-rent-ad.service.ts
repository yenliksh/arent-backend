import { ApartmentAdStatusType } from '@domains/apartment-ad/domain/types';
import { TimeInterval } from '@domains/apartment-ad/types';
import { ContractRequestStatus } from '@domains/contract-request/domain/types';
import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { raw } from 'objection';

import { FindShortTermRentAdRequest } from './find-short-term-rent-ad.request';

type averageResponseOnRequest = {
  average: TimeInterval;
};

export interface ShortTermRentOrmEntityAndAverage {
  shortTermRent: ShortTermRentOrmEntity;
  averageResponseOnRequest: TimeInterval;
}

@Injectable()
export class FindShortTermRentAdService {
  async handle(dto: FindShortTermRentAdRequest): Promise<ShortTermRentOrmEntityAndAverage | undefined> {
    const { id } = dto;

    const shortTermRent = await ShortTermRentOrmEntity.query()
      .withGraphJoined({
        apartmentAd: true,
      })
      .findById(id)
      .where((builder) =>
        builder
          .where('status', '@>', [ApartmentAdStatusType.PUBLISHED])
          .orWhere('status', '@>', [ApartmentAdStatusType.PAUSED]),
      );

    if (!shortTermRent) {
      throw new NotFoundException('Not found shortTermRent');
    }

    const apartmentAdId = shortTermRent.apartmentAdId;

    if (!apartmentAdId) {
      throw new NotFoundException('Not found apartmentAdId');
    }

    const [averageResponse] = (await ContractRequestOrmEntity.query()
      .select(raw(`avg( "updatedAt" - "createdAt" ) "average"`))
      .whereIn('status', [ContractRequestStatus.ACCEPTED, ContractRequestStatus.REJECTED])
      .andWhere(`apartmentAdId`, apartmentAdId)) as unknown as averageResponseOnRequest[];

    return { shortTermRent, averageResponseOnRequest: averageResponse.average };
  }

  async handleByApId(dto: FindShortTermRentAdRequest): Promise<ShortTermRentOrmEntityAndAverage | undefined> {
    const { id } = dto;

    const shortTermRent = await ShortTermRentOrmEntity.query()
      .withGraphJoined({
        apartmentAd: true,
      })
      .findOne({ apartmentAdId: id })
      .where((builder) =>
        builder
          .where('status', '@>', [ApartmentAdStatusType.PUBLISHED])
          .orWhere('status', '@>', [ApartmentAdStatusType.PAUSED]),
      );

    if (!shortTermRent) {
      throw new NotFoundException('Not found shortTermRent');
    }

    const apartmentAdId = shortTermRent.apartmentAdId;

    if (!apartmentAdId) {
      throw new NotFoundException('Not found apartmentAdId');
    }

    const [averageResponse] = (await ContractRequestOrmEntity.query()
      .select(raw(`avg( "updatedAt" - "createdAt" ) "average"`))
      .whereIn('status', [ContractRequestStatus.ACCEPTED, ContractRequestStatus.REJECTED])
      .andWhere(`apartmentAdId`, apartmentAdId)) as unknown as averageResponseOnRequest[];

    return { shortTermRent, averageResponseOnRequest: averageResponse.average };
  }
}
