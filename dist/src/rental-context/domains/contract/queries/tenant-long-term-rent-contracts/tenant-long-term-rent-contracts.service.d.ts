import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { Ok } from 'oxide.ts';
import { TenantLongTermRentContractsRequest } from './tenant-long-term-rent-contracts.request.dto';
export declare class TenantLongTermRentContractsService {
    handle(userId: UserOrmEntity['id'], input: TenantLongTermRentContractsRequest): Promise<Ok<PaginationResult<ContractOrmEntity>>>;
}
