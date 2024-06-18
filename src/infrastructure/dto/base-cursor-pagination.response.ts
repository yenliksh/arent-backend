import { PageAfterCursorInfo, PageBeforeCursorInfo } from '@infrastructure/models/page-cursor-info.model';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

export interface IBaseCursorPaginationResponse<M extends ModelBase> {
  data?: M[];
  pageInfo?: PageAfterCursorInfo | PageBeforeCursorInfo;
}

export function BaseAfterCursorPaginationResponse<M extends ModelBase>(
  M: Type<M>,
): Type<IBaseCursorPaginationResponse<M>> {
  @ObjectType({ isAbstract: true })
  class BaseCursorPaginationResponse<M extends ModelBase> implements IBaseCursorPaginationResponse<M> {
    @Field(() => [M], { nullable: true })
    data?: M[];

    @Field(() => PageAfterCursorInfo, { nullable: true })
    pageInfo?: PageAfterCursorInfo;
  }

  return BaseCursorPaginationResponse;
}

export function BaseBeforeCursorPaginationResponse<M extends ModelBase>(
  M: Type<M>,
): Type<IBaseCursorPaginationResponse<M>> {
  @ObjectType({ isAbstract: true })
  class BaseCursorPaginationResponse<M extends ModelBase> implements IBaseCursorPaginationResponse<M> {
    @Field(() => [M], { nullable: true })
    data?: M[];

    @Field(() => PageBeforeCursorInfo, { nullable: true })
    pageInfo?: PageBeforeCursorInfo;
  }

  return BaseCursorPaginationResponse;
}
