import { BaseOffsetPaginationInfoModel } from '@infrastructure/models/base-offset-pagination-info.model';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

export interface IBaseOffsetPaginationResponse<M extends ModelBase> {
  data?: M[];
  pageInfo?: BaseOffsetPaginationInfoModel;
}

export function BaseOffsetPaginationResponse<M extends ModelBase>(M: Type<M>): Type<IBaseOffsetPaginationResponse<M>> {
  @ObjectType({ isAbstract: true })
  class BaseOffsetPaginationPayload<M extends ModelBase> implements IBaseOffsetPaginationResponse<M> {
    @Field(() => [M], { nullable: true })
    data?: M[];

    @Field(() => BaseOffsetPaginationInfoModel, { nullable: true })
    pageInfo?: BaseOffsetPaginationInfoModel;
  }

  return BaseOffsetPaginationPayload;
}
