import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { FindContractRequestRequest } from './find-contract-request.request.dto';
export declare class FindContractRequestService {
    handle(userId: UserOrmEntity['id'], dto: FindContractRequestRequest): Promise<Result<ContractRequestOrmEntity, HttpException>>;
}
