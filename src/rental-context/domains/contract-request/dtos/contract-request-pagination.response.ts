import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { BaseAfterCursorPaginationResponse } from '@infrastructure/dto/base-cursor-pagination.response';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { ObjectType } from '@nestjs/graphql';

import { ContractRequestModel } from '../models/contract-request.model';

@ObjectType()
export class ContractRequestPaginationResponse extends BaseAfterCursorPaginationResponse(ContractRequestModel) {
  static create = (props: PaginationResult<ContractRequestOrmEntity>) => {
    const payload = new ContractRequestPaginationResponse();

    payload.data = props.data.map(ContractRequestModel.create);
    payload.pageInfo = props.pageInfo;

    return payload;
  };
}
