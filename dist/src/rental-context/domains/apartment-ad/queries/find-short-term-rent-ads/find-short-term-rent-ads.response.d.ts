import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { BasePriceInfoModel } from '@infrastructure/models/base-price-info.model';
import { SlugModel } from '@infrastructure/models/slug.model';
import { OffsetPaginationResult } from '@libs/utils/offset-paginaton-service';
import { ApartmentAdShortTermRentViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-short-term-rent.model';
declare const FindShortTermRentAdsResponse_base: import("@nestjs/common").Type<import("@infrastructure/dto/base-offset-pagination.response.dto").IBaseOffsetPaginationResponse<ApartmentAdShortTermRentViewModel>>;
export declare class FindShortTermRentAdsResponse extends FindShortTermRentAdsResponse_base {
    priceInfo: BasePriceInfoModel;
    slugs?: SlugModel[];
    static create: (props: OffsetPaginationResult<ShortTermRentOrmEntity>) => FindShortTermRentAdsResponse;
}
export {};
