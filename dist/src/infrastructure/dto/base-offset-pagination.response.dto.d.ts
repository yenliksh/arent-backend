import { BaseOffsetPaginationInfoModel } from '@infrastructure/models/base-offset-pagination-info.model';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Type } from '@nestjs/common';
export interface IBaseOffsetPaginationResponse<M extends ModelBase> {
    data?: M[];
    pageInfo?: BaseOffsetPaginationInfoModel;
}
export declare function BaseOffsetPaginationResponse<M extends ModelBase>(M: Type<M>): Type<IBaseOffsetPaginationResponse<M>>;
