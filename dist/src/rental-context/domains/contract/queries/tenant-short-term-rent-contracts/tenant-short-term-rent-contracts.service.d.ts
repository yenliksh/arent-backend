import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { Ok } from 'oxide.ts';
import { TenantShortTermRentContractsRequest } from './tenant-short-term-rent-contracts.request.dto';
export declare class TenantShortTermRentContractsService {
    handle(userId: UserOrmEntity['id'], input: TenantShortTermRentContractsRequest): Promise<Ok<PaginationResult<ContractOrmEntity>>>;
}
