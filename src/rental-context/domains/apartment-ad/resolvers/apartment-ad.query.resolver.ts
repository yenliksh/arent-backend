import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { BaseOffsetPaginationRequest } from '@infrastructure/dto/base-offset-pagination.request.dto';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { FindApartmentAdIdentificatorRequest } from '../commands/find-apartment-ad-identificator/find-apartment-ad-identificator.request.dto';
import { FindApartmentAdIdentificatorService } from '../commands/find-apartment-ad-identificator/find-apartment-ad-identificator.service';
import { FindApartmentAdsIdentificatorsRequest } from '../commands/find-apartment-ad-identificator/find-apartment-ads-identificators.request.dto';
import { ApartmentAdIdentificatorResponse } from '../dtos/apartment-ad-identificator.response.dto';
import { ApartmentAdSlugResponse } from '../dtos/apartment-ad-slug-response.dto';
import { ApartmentAdsSlugResponse } from '../dtos/apartment-ads-slug-response.dto';
import { ApartmentAdsUnionResponse } from '../dtos/apartment-ads-union.response.dto';
import { FindLongTermRentAdsFilterRequest } from '../dtos/find-long-term-rent-ads-filter.request';
import { FindShortTermRentAdsFilterRequest } from '../dtos/find-short-term-rent-ads-filter.request';
import { ApartmentAdModel } from '../models/apartment-ad.model';
import { FindLongTermRentAdRequest } from '../queries/find-long-term-rent-ad/find-long-term-rent-ad.request';
import { FindLongTermRentAdResponse } from '../queries/find-long-term-rent-ad/find-long-term-rent-ad.response';
import { FindLongTermRentAdService } from '../queries/find-long-term-rent-ad/find-long-term-rent-ad.service';
import { FindLongTermRentAdsClusterResponse } from '../queries/find-long-term-rent-ads-cluster/find-long-term-rent-ads-cluster.response';
import { FindLongTermRentAdsClusterService } from '../queries/find-long-term-rent-ads-cluster/find-long-term-rent-ads-cluster.service';
import { FindLongTermRentAdsResponse } from '../queries/find-long-term-rent-ads/find-long-term-rent-ads.response';
import { FindLongTermRentAdsService } from '../queries/find-long-term-rent-ads/find-long-term-rent-ads.service';
import { FindShortTermRentAdRequest } from '../queries/find-short-term-rent-ad/find-short-term-rent-ad.request';
import { FindShortTermRentAdResponse } from '../queries/find-short-term-rent-ad/find-short-term-rent-ad.response';
import { FindShortTermRentAdService } from '../queries/find-short-term-rent-ad/find-short-term-rent-ad.service';
import { FindShortTermRentAdsClusterResponse } from '../queries/find-short-term-rent-ads-cluster/find-short-term-rent-ads-cluster.response';
import { FindShortTermRentAdsClusterService } from '../queries/find-short-term-rent-ads-cluster/find-short-term-rent-ads-cluster.service';
import { FindShortTermRentAdsResponse } from '../queries/find-short-term-rent-ads/find-short-term-rent-ads.response';
import { FindShortTermRentAdsService } from '../queries/find-short-term-rent-ads/find-short-term-rent-ads.service';
import { MyApartmentAdStatusCountResponse } from '../queries/my-apartment-ad-status-count/my-apartment-ad-status-count.responce';
import { MyApartmentAdStatusCountService } from '../queries/my-apartment-ad-status-count/my-apartment-ad-status-count.service';
import { MyApartmentAdRequest } from '../queries/my-apartment-ad/my-apartment-ad.request';
import { MyApartmentAdService } from '../queries/my-apartment-ad/my-apartment-ad.service';
import { MyApartmentAdsRequest } from '../queries/my-apartment-ads/my-apartment-ads.request';
import { MyApartmentAdsService } from '../queries/my-apartment-ads/my-apartment-ads.service';

@Resolver()
export class ApartmentAdQueryGraphqlResolver {
  constructor(
    private readonly findMyApartmentAdService: MyApartmentAdService,
    private readonly findMyApartmentAdsService: MyApartmentAdsService,
    private readonly findMyApartmentAdStatusCountService: MyApartmentAdStatusCountService,
    private readonly findLongTermRentAdsService: FindLongTermRentAdsService,
    private readonly findLongTermRentAdService: FindLongTermRentAdService,
    private readonly findShortTermRentAdsService: FindShortTermRentAdsService,
    private readonly findShortTermRentAdService: FindShortTermRentAdService,
    private readonly findShortTermRentAdsClusterService: FindShortTermRentAdsClusterService,
    private readonly findLongTermRentAdsClusterService: FindLongTermRentAdsClusterService,
    private readonly findApartmentAdIdentificatorService: FindApartmentAdIdentificatorService,
  ) {}

  @UseGuards(JwtAuthGuard())
  @Query(() => ApartmentAdModel, { name: 'rentAd__myRentAd' })
  async findMyApartmentAd(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: MyApartmentAdRequest,
  ): Promise<ApartmentAdModel> {
    const result = await this.findMyApartmentAdService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ApartmentAdModel.create(result.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => ApartmentAdsUnionResponse, { name: 'rentAd__myRentAd_unionRentPeriods' })
  async findMyApartmentAds(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: MyApartmentAdsRequest,
  ): Promise<ApartmentAdsUnionResponse> {
    const result = await this.findMyApartmentAdsService.handle(input, userId);

    const [shortTermRent, longTermRent] = result.unwrap();

    return ApartmentAdsUnionResponse.create([shortTermRent, longTermRent]);
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => MyApartmentAdStatusCountResponse, { name: 'rentAd__myRentAd_statusCount' })
  async apartmentAdStatusCount(@IAM('id') userId: UserOrmEntity['id']) {
    const result = await this.findMyApartmentAdStatusCountService.handle(userId);

    return result.unwrap();
  }

  @Query(() => FindLongTermRentAdsResponse, { name: 'rentAd__find_longTermAds' })
  async findLongTermRentAds(
    @Args('filter') filter: FindLongTermRentAdsFilterRequest,
    @Args('pagination') pagination: BaseOffsetPaginationRequest,
  ) {
    const result = await this.findLongTermRentAdsService.handle({ filter, pagination });

    return FindLongTermRentAdsResponse.create(result);
  }

  @Query(() => FindLongTermRentAdsClusterResponse, { name: 'rentAd__find_longTermAdsCluster' })
  async findLongTermRentAdsCluster(@Args('filter') filter: FindLongTermRentAdsFilterRequest) {
    const [documents, totalItems, slugs] = await this.findLongTermRentAdsClusterService.handle({ filter });

    return FindLongTermRentAdsClusterResponse.create(documents, totalItems, slugs);
  }

  @Query(() => FindShortTermRentAdsResponse, { name: 'rentAd__find_shortTermAds' })
  async findShortTermRentAds(
    @Args('filter') filter: FindShortTermRentAdsFilterRequest,
    @Args('pagination') pagination: BaseOffsetPaginationRequest,
  ) {
    const result = await this.findShortTermRentAdsService.handle({ filter, pagination });

    return FindShortTermRentAdsResponse.create(result);
  }

  @Query(() => FindShortTermRentAdsClusterResponse, { name: 'rentAd__find_shortTermAdsCluster' })
  async findShortTermRentAdsCluster(@Args('filter') filter: FindShortTermRentAdsFilterRequest) {
    const [documents, totalItems, slugs] = await this.findShortTermRentAdsClusterService.handle({ filter });

    return FindShortTermRentAdsClusterResponse.create(documents, totalItems, slugs);
  }

  @Query(() => FindShortTermRentAdResponse, { nullable: true, name: 'rentAd__find_shortTermRentAd' })
  async findShortTermRentAd(
    @Args('input') dto: FindShortTermRentAdRequest,
  ): Promise<FindShortTermRentAdResponse | null> {
    const result = await this.findShortTermRentAdService.handle(dto);

    if (!result) {
      return null;
    }

    const { shortTermRent, averageResponseOnRequest } = result;

    return FindShortTermRentAdResponse.create(shortTermRent, averageResponseOnRequest);
  }

  @Query(() => FindShortTermRentAdResponse, { nullable: true, name: 'rentAd__find_shortTermAdByApartmentId' })
  async findShortTermRentAdByApartmentId(
    @Args('input') dto: FindShortTermRentAdRequest,
  ): Promise<FindShortTermRentAdResponse | null> {
    const result = await this.findShortTermRentAdService.handleByApId(dto);

    if (!result) {
      return null;
    }

    const { shortTermRent, averageResponseOnRequest } = result;

    return FindShortTermRentAdResponse.create(shortTermRent, averageResponseOnRequest);
  }

  @Query(() => FindLongTermRentAdResponse, { nullable: true, name: 'rentAd__find_longTermAd' })
  async findLongTermRentAd(
    @Args('input') dto: FindLongTermRentAdRequest,
    @IAM('id') userId?: string,
  ): Promise<FindLongTermRentAdResponse | null> {
    const result = await this.findLongTermRentAdService.handle(dto, userId);

    if (!result) {
      return null;
    }

    const { longTermRent, averageResponseOnRequest } = result;

    return FindLongTermRentAdResponse.create(longTermRent, averageResponseOnRequest);
  }

  @Query(() => FindLongTermRentAdResponse, { nullable: true, name: 'rentAd__find_longTermAdByApId' })
  async findLongTermRentAdByApId(
    @Args('input') dto: FindLongTermRentAdRequest,
    @IAM('id') userId?: string,
  ): Promise<FindLongTermRentAdResponse | null> {
    const result = await this.findLongTermRentAdService.handleByApId(dto, userId);

    if (!result) {
      return null;
    }

    const { longTermRent, averageResponseOnRequest } = result;

    return FindLongTermRentAdResponse.create(longTermRent, averageResponseOnRequest);
  }

  @Query(() => ApartmentAdIdentificatorResponse, { name: 'rentAdIdentificator__find' })
  async createApartmentAdIdentificatorFind(
    @Args('input') input: FindApartmentAdIdentificatorRequest,
  ): Promise<ApartmentAdIdentificatorResponse> {
    const result = await this.findApartmentAdIdentificatorService.handle(input);

    const apartmentAd = result.unwrap().getPropsCopy();

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ApartmentAdIdentificatorResponse.create({
      apartmentId: apartmentAd.apartmentId.value,
      titleSeo: apartmentAd.titleSeo,
      keywordsSeo: apartmentAd.keywordsSeo,
      descriptionSeo: apartmentAd.descriptionSeo,
    });
  }

  @Query(() => ApartmentAdSlugResponse, { name: 'rentAdIdentificator__findByRentId' })
  async createApartmentAdIdentificatorFindByApId(
    @Args('input') input: FindApartmentAdIdentificatorRequest,
  ): Promise<ApartmentAdSlugResponse> {
    const result = await this.findApartmentAdIdentificatorService.handleByApId(input);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ApartmentAdSlugResponse.create({
      titleSeo: result.unwrap().titleSeo,
      adSearchId: result.unwrap().adSearchId,
    });
  }

  @Query(() => ApartmentAdsSlugResponse, { name: 'rentAdIdentificators__findByRentIds' })
  async createApartmentAdIdentificatorsFindByApIds(
    @Args('input') input: FindApartmentAdsIdentificatorsRequest,
  ): Promise<ApartmentAdsSlugResponse> {
    const result = await this.findApartmentAdIdentificatorService.handleByApIds(input);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ApartmentAdsSlugResponse.create({
      apAdIds: result.unwrap(),
    });
  }
}
