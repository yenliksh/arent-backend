import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { PaginationResult, decodeCursor, getDataWithAfterCursor } from '@libs/utils/cursor-paginator';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';
import {
  ContractRequestCursorType,
  ContractRequestStatus,
} from 'src/rental-context/domains/contract-request/domain/types';

import { FindContractRequestForLandlordRequest } from './find-contract-request-for-landlord.request.dto';

@Injectable()
export class FindContractRequestForLandlordService {
  async handle(
    userId: string,
    input: FindContractRequestForLandlordRequest,
  ): Promise<Ok<PaginationResult<ContractRequestOrmEntity>>> {
    const { type, afterCursor, limit = 3 } = input;

    const cursorAfter: ContractRequestCursorType | undefined = afterCursor
      ? decodeCursor<ContractRequestCursorType>(afterCursor)
      : undefined;

    const apartmentLandlordSubQuery = ApartmentAdOrmEntity.query().where('landlordId', userId);
    const contractRequestsQb = ApartmentAdOrmEntity.relatedQuery('contractRequests')
      .for(apartmentLandlordSubQuery)
      .where({ apartmentRentPeriodType: type })
      .where({ status: ContractRequestStatus.CREATED })
      .limit(limit + 1)
      .orderBy([
        { column: 'createdAt', order: 'DESC' },
        { column: 'id', order: 'DESC' },
      ]);

    if (cursorAfter) {
      contractRequestsQb.where((builder) => {
        builder.whereRaw(
          `${ContractRequestOrmEntity.tableName}."createdAt"::timestamptz < '${cursorAfter.createdAt}'::timestamptz`,
        );
        builder.orWhereRaw(
          `(${ContractRequestOrmEntity.tableName}."createdAt"::timestamptz = '${cursorAfter.createdAt}'::timestamptz)
          AND (${ContractRequestOrmEntity.tableName}."id" < '${cursorAfter.id}')`,
        );
      });
    }

    const contractRequests = await contractRequestsQb;

    const returningData = getDataWithAfterCursor<ContractRequestOrmEntity, ContractRequestOrmEntity>(
      contractRequests,
      limit,
      (i) => i,
      null,
      ['id', 'createdAt'],
    );

    return Ok(returningData);
  }
}
