import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { LandlordContractRequest } from './landlord-contract.request';
export declare class LandlordContractService {
    handle(dto: LandlordContractRequest, userId: UserOrmEntity['id']): Promise<Result<ContractOrmEntity, HttpException>>;
}
