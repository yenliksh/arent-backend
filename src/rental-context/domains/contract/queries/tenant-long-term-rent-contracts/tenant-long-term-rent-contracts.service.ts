import { ContractCursorType } from '@domains/contract/types';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ApartmentRentPeriodType, ContractRentStatus, ContractStatus } from '@infrastructure/enums';
import { PaginationResult, decodeCursor, getDataWithAfterCursor } from '@libs/utils/cursor-paginator';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';

import { TenantLongTermRentContractsRequest } from './tenant-long-term-rent-contracts.request.dto';

@Injectable()
export class TenantLongTermRentContractsService {
  async handle(
    userId: UserOrmEntity['id'],
    input: TenantLongTermRentContractsRequest,
  ): Promise<Ok<PaginationResult<ContractOrmEntity>>> {
    const { type, afterCursor, limit = 20 } = input;

    const contractStatusMapper: { [P in ContractRentStatus]: ContractStatus[] } = {
      [ContractRentStatus.CONCLUDED]: [ContractStatus.CONCLUDED],
      [ContractRentStatus.COMPLETED]: [ContractStatus.COMPLETED, ContractStatus.REJECTED],
    };

    const cursorAfter: ContractCursorType | undefined = afterCursor
      ? decodeCursor<ContractCursorType>(afterCursor)
      : undefined;

    const contractsQueryBuilder = ContractOrmEntity.query()
      .where('tenantId', userId)
      .whereIn('status', contractStatusMapper[type])
      .where('apartmentRentPeriodType', ApartmentRentPeriodType.LONG_TERM)
      .limit(limit + 1)
      .orderBy('createdAt', 'DESC');

    if (cursorAfter) {
      contractsQueryBuilder.whereRaw(
        `${ContractOrmEntity.tableName}."createdAt"::timestamptz < '${cursorAfter.createdAt}'::timestamptz`,
      );
    }

    const chats = await contractsQueryBuilder;

    const returningData = getDataWithAfterCursor<ContractOrmEntity, ContractOrmEntity>(chats, limit, (i) => i, null, [
      'createdAt',
    ]);

    return Ok(returningData);
  }
}
