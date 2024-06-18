import { ApartmentAdClusterInfoModel } from '@domains/apartment-ad/models/apartment-ad-cluster-info.model';
import { ApartmentAdClusterModel } from '@domains/apartment-ad/models/apartment-ad-cluster.model';
import { LongTermRentDocumentProps } from '@infrastructure/elastic-search/documents/long-term-rent.document';
import { ShortTermRentDocumentProps } from '@infrastructure/elastic-search/documents/short-term-rent.document';
import { SlugModel } from '@infrastructure/models/slug.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FindShortTermRentAdsClusterResponse {
  @Field(() => [ApartmentAdClusterModel])
  data: ApartmentAdClusterModel[];

  @Field(() => ApartmentAdClusterInfoModel)
  clusterInfo: ApartmentAdClusterInfoModel;

  @Field(() => [SlugModel])
  slugs?: SlugModel[];

  static create = (
    data: (LongTermRentDocumentProps | ShortTermRentDocumentProps)[],
    totalItems: number,
    slugs?: SlugModel[],
  ) => {
    const payload = new FindShortTermRentAdsClusterResponse();

    payload.data = data.map((i) => ApartmentAdClusterModel.create(i));
    payload.clusterInfo = ApartmentAdClusterInfoModel.create({ totalItems });
    payload.slugs = slugs;

    return payload;
  };
}
