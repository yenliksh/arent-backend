"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offsetPaginationService = void 0;
class OffsetPagination {
    getPaginationOffset({ page, limit }) {
        return (page - 1) * limit;
    }
    getPageCount({ total, limit }) {
        return Math.ceil(total / limit) || 1;
    }
    getPaginationResult({ data, limit, currentPage, totalItems, minCost = 0, maxCost = 0, slugs = [], }) {
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
exports.offsetPaginationService = offsetPaginationService;
//# sourceMappingURL=offset-paginaton-service.js.map