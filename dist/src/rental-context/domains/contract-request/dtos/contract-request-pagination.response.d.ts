import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { ContractRequestModel } from '../models/contract-request.model';
declare const ContractRequestPaginationResponse_base: import("@nestjs/common").Type<import("@infrastructure/dto/base-cursor-pagination.response").IBaseCursorPaginationResponse<ContractRequestModel>>;
export declare class ContractRequestPaginationResponse extends ContractRequestPaginationResponse_base {
    static create: (props: PaginationResult<ContractRequestOrmEntity>) => ContractRequestPaginationResponse;
}
export {};
