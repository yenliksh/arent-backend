import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { Ok } from 'oxide.ts';
import { FindContractRequestForLandlordRequest } from './find-contract-request-for-landlord.request.dto';
export declare class FindContractRequestForLandlordService {
    handle(userId: string, input: FindContractRequestForLandlordRequest): Promise<Ok<PaginationResult<ContractRequestOrmEntity>>>;
}
