import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { FindContractRequest } from './find-contract.request';
export declare class FindContractService {
    handle(dto: FindContractRequest, userId: UserOrmEntity['id']): Promise<Result<ContractOrmEntity, HttpException>>;
}
