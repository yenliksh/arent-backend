import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { BaseOffsetPaginationResponse } from '@infrastructure/dto/base-offset-pagination.response.dto';
import { BasePriceInfoModel } from '@infrastructure/models/base-price-info.model';
import { SlugModel } from '@infrastructure/models/slug.model';
import { OffsetPaginationResult } from '@libs/utils/offset-paginaton-service';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApartmentAdLongTermRentViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-long-term-rent.model';

@ObjectType()
export class FindLongTermRentAdsResponse extends BaseOffsetPaginationResponse(ApartmentAdLongTermRentViewModel) {
  @Field(() => BasePriceInfoModel)
  priceInfo: BasePriceInfoModel;

  @Field(() => [SlugModel])
  slugs?: SlugModel[];

  static create = (props: OffsetPaginationResult<LongTermRentOrmEntity>) => {
    const payload = new FindLongTermRentAdsResponse();

    payload.data = props.data.map((i) => ApartmentAdLongTermRentViewModel.create(i));
    payload.pageInfo = props.pageInfo;
    payload.priceInfo = BasePriceInfoModel.create(props.priceInfo);
    payload.slugs = props.slugs?.map((i) => SlugModel.create({ id: i.id, slug: i.slug ?? '' }));

    return payload;
  };
}
