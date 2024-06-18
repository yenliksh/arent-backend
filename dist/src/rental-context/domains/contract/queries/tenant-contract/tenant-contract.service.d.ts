import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { TenantContractRequest } from './tenant-contract.request';
export declare class TenantContractService {
    handle(dto: TenantContractRequest, userId: UserOrmEntity['id']): Promise<Result<ContractOrmEntity, HttpException>>;
}
