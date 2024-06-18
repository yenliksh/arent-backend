import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { BasePriceInfoModel } from '@infrastructure/models/base-price-info.model';
import { SlugModel } from '@infrastructure/models/slug.model';
import { OffsetPaginationResult } from '@libs/utils/offset-paginaton-service';
import { ApartmentAdLongTermRentViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-long-term-rent.model';
declare const FindLongTermRentAdsResponse_base: import("@nestjs/common").Type<import("@infrastructure/dto/base-offset-pagination.response.dto").IBaseOffsetPaginationResponse<ApartmentAdLongTermRentViewModel>>;
export declare class FindLongTermRentAdsResponse extends FindLongTermRentAdsResponse_base {
    priceInfo: BasePriceInfoModel;
    slugs?: SlugModel[];
    static create: (props: OffsetPaginationResult<LongTermRentOrmEntity>) => FindLongTermRentAdsResponse;
}
export {};
