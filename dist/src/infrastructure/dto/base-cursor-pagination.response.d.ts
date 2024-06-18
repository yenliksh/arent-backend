import { PageAfterCursorInfo, PageBeforeCursorInfo } from '@infrastructure/models/page-cursor-info.model';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Type } from '@nestjs/common';
export interface IBaseCursorPaginationResponse<M extends ModelBase> {
    data?: M[];
    pageInfo?: PageAfterCursorInfo | PageBeforeCursorInfo;
}
export declare function BaseAfterCursorPaginationResponse<M extends ModelBase>(M: Type<M>): Type<IBaseCursorPaginationResponse<M>>;
export declare function BaseBeforeCursorPaginationResponse<M extends ModelBase>(M: Type<M>): Type<IBaseCursorPaginationResponse<M>>;
