import { ContractTenantModel } from '@domains/contract/models/contract.model';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { BaseAfterCursorPaginationResponse } from '@infrastructure/dto/base-cursor-pagination.response';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TenantContractsPaginationResponse extends BaseAfterCursorPaginationResponse(ContractTenantModel) {
  static create(props: PaginationResult<ContractOrmEntity>) {
    const payload = new TenantContractsPaginationResponse();

    payload.data = props.data.map(ContractTenantModel.create);
    payload.pageInfo = props.pageInfo;

    return payload;
  }
}
