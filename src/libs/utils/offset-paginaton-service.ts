import { BaseOffsetPaginationRequest } from '@infrastructure/dto/base-offset-pagination.request.dto';
import { BaseOffsetPaginationInfoModel } from '@infrastructure/models/base-offset-pagination-info.model';
import { BasePriceInfoModel } from '@infrastructure/models/base-price-info.model';
import { Model } from 'objection';

export type ISlug = {
  id: string;
  slug: string | undefined;
};

export type OffsetPaginationResult<T> = {
  data: T[];
  slugs?: ISlug[];
  pageInfo: BaseOffsetPaginationInfoModel;
  priceInfo: BasePriceInfoModel;
};

class OffsetPagination {
  getPaginationOffset({ page, limit }: BaseOffsetPaginationRequest): number {
    return (page - 1) * limit;
  }

  getPageCount({ total, limit }: { total: number; limit: number }): number {
    return Math.ceil(total / limit) || 1;
  }

  getPaginationResult<T extends Model>({
    data,
    limit,
    currentPage,
    totalItems,
    minCost = 0,
    maxCost = 0,
    slugs = [],
  }: {
    data: T[];
    limit: number;
    currentPage: number;
    totalItems: number;
    minCost: number;
    maxCost: number;
    slugs?: ISlug[];
  }): OffsetPaginationResult<T> {
    const totalPages = this.getPageCount({
      total: totalItems,
      limit,
    });

    return {
      data,
      slugs,
      pageInfo: {
        currentPage,
        totalPages,
        totalItems,
        limit,
      },
      priceInfo: {
        min: minCost.toString(),
        max: maxCost.toString(),
      },
    };
  }
}

const offsetPaginationService = new OffsetPagination();

export { offsetPaginationService };
