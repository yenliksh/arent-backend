import { BaseOffsetPaginationRequest } from '@infrastructure/dto/base-offset-pagination.request.dto';
import { BaseOffsetPaginationInfoModel } from '@infrastructure/models/base-offset-pagination-info.model';
import { BasePriceInfoModel } from '@infrastructure/models/base-price-info.model';
import { Model } from 'objection';
export declare type ISlug = {
    id: string;
    slug: string | undefined;
};
export declare type OffsetPaginationResult<T> = {
    data: T[];
    slugs?: ISlug[];
    pageInfo: BaseOffsetPaginationInfoModel;
    priceInfo: BasePriceInfoModel;
};
declare class OffsetPagination {
    getPaginationOffset({ page, limit }: BaseOffsetPaginationRequest): number;
    getPageCount({ total, limit }: {
        total: number;
        limit: number;
    }): number;
    getPaginationResult<T extends Model>({ data, limit, currentPage, totalItems, minCost, maxCost, slugs, }: {
        data: T[];
        limit: number;
        currentPage: number;
        totalItems: number;
        minCost: number;
        maxCost: number;
        slugs?: ISlug[];
    }): OffsetPaginationResult<T>;
}
declare const offsetPaginationService: OffsetPagination;
export { offsetPaginationService };
