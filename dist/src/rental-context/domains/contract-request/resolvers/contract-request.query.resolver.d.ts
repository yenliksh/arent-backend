import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ContractRequestPaginationResponse } from '../dtos/contract-request-pagination.response';
import { FindContractRequestForLandlordRequest } from '../queries/find-contract-request-for-landlord/find-contract-request-for-landlord.request.dto';
import { FindContractRequestForLandlordService } from '../queries/find-contract-request-for-landlord/find-contract-request-for-landlord.service';
export declare class ContractRequestQueryGraphqlResolver {
    private readonly findForLandlordService;
    constructor(findForLandlordService: FindContractRequestForLandlordService);
    findForLandlord(iam: UserOrmEntity, input: FindContractRequestForLandlordRequest): Promise<ContractRequestPaginationResponse>;
}
