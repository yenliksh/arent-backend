import { ContractTenantModel } from '@domains/contract/models/contract.model';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
declare const TenantContractsPaginationResponse_base: import("@nestjs/common").Type<import("@infrastructure/dto/base-cursor-pagination.response").IBaseCursorPaginationResponse<ContractTenantModel>>;
export declare class TenantContractsPaginationResponse extends TenantContractsPaginationResponse_base {
    static create(props: PaginationResult<ContractOrmEntity>): TenantContractsPaginationResponse;
}
export {};
