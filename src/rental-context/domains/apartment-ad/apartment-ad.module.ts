import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { ElasticsearchCoreModule } from '@infrastructure/elastic-search/elasticsearch-core.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AddApartmentAdOwnershipDocumentsService } from './commands/add-apatment-ad-ownership-documents/add-apatment-ad-ownership-documents.service';
import { AddApartmentAdPaymentMethodService } from './commands/add-apatment-ad-payment-method/add-apatment-ad-payment-method.service';
import { AdminDeleteApartmentAdHandler } from './commands/admins/admin-delete-apartment-ad/admin-delete-apartment-ad.handler';
import { AdminDeleteApartmentIdentificatorHandler } from './commands/admins/admin-delete-apartment-identificator/admin-delete-apartment-identificator.handler';
import { AdminEditApartmentAdDescriptionHandler } from './commands/admins/admin-edit-apartment-ad-description/admin-edit-apartment-ad-description.handler';
import { AdminEditApartmentAdMetaTagHandler } from './commands/admins/admin-edit-apartment-ad-meta-tag/admin-edit-apartment-ad-meta-tag.handler';
import { AdminGetApartmentAdMetaTagHandler } from './commands/admins/admin-get-apartment-ad-meta-tag/admin-get-apartment-ad-meta-tag.handler';
import { ApproveAdLongTermRentHandler } from './commands/approve-ad-long-term-rent/aprove-ad-long-term-rent.handler';
import { ApproveAdShortTermRentHandler } from './commands/approve-ad-short-term-rent/aprove-ad-short-term-rent.handler';
import { CreateApartmentAdIdentificatorService } from './commands/create-apartment-ad-identificator/create-apartment-ad-identificator.service';
import { CreateApartmentAdService } from './commands/create-apartment-ad/create-apartment-ad.service';
import { DeleteApartmentAdService } from './commands/delete-apartment-ad/delete-apartment-ad.service';
import { EditApartmentAdAddressService } from './commands/edit-apartment-ad-address/edit-apartment-ad-address.service';
import { EditApartmentAdDescriptionService } from './commands/edit-apartment-ad-description/edit-apartment-ad-description.service';
import { EditApartmentAdDetailsService } from './commands/edit-apartment-ad-details/edit-apartment-ad-details.service';
import { EditApartmentAdImportantInfoService } from './commands/edit-apartment-ad-important-info/edit-apartment-ad-important-info.service';
import { EditApartmentAdMediaService } from './commands/edit-apartment-ad-media/edit-apartment-ad-media.service';
import { EditApartmentAdTypeService } from './commands/edit-apartment-ad-type/edit-apartment-ad-type.service';
import { EditApartmentAdService } from './commands/edit-apartment-ad/edit-apartment-ad.service';
import { EditShortTermRentAvailabilityService } from './commands/edit-short-term-rent-availability-settings/edit-short-term-rent-availability-settings.service';
import { FindApartmentAdIdentificatorService } from './commands/find-apartment-ad-identificator/find-apartment-ad-identificator.service';
import { FindApartmentMetatagsHandler } from './commands/find-apartment-metatags/find-apartment-metatags.handler';
import { PauseApartmentAdByTypeHandler } from './commands/pause-apartment-ad/pause-apartment-ad-by-type.handler';
import { PublishApartmentAdByTypeHandler } from './commands/publish-apartment-ad/publish-apartment-ad-by-type.handler';
import { RejectAdLongTermRentHandler } from './commands/reject-ad-long-term-rent/reject-ad-long-term-rent.handler';
import { RejectAdShortTermRentHandler } from './commands/reject-ad-short-term-rent/reject-ad.short-rent.handler';
import { SendToApproveApartmentAdService } from './commands/send-to-approve-apartment-ad/send-to-approve-apartment-ad.service';
import { ShortTermSwitchRentBookingTypeService } from './commands/short-term-switch-rent-booking-type/short-term-switch-rent-booking-type.service';
import { UpdateApartmentAdIdentificatorService } from './commands/update-apartment-ad-identificator/update-apartment-ad-identificator.service';
import { ApartmentSlugUpdateHandler } from './cron/commands/apartment-slug-update.handler';
import { ApartmentsTitlesUpdateHandler } from './cron/commands/apartments-titles-update.handler';
import { FindLongTermRentAdService } from './queries/find-long-term-rent-ad/find-long-term-rent-ad.service';
import { FindLongTermRentAdsClusterService } from './queries/find-long-term-rent-ads-cluster/find-long-term-rent-ads-cluster.service';
import { FindLongTermRentAdsService } from './queries/find-long-term-rent-ads/find-long-term-rent-ads.service';
import { FindShortTermRentAdService } from './queries/find-short-term-rent-ad/find-short-term-rent-ad.service';
import { FindShortTermRentAdsClusterService } from './queries/find-short-term-rent-ads-cluster/find-short-term-rent-ads-cluster.service';
import { FindShortTermRentAdsService } from './queries/find-short-term-rent-ads/find-short-term-rent-ads.service';
import { MyApartmentAdStatusCountService } from './queries/my-apartment-ad-status-count/my-apartment-ad-status-count.service';
import { MyApartmentAdService } from './queries/my-apartment-ad/my-apartment-ad.service';
import { MyApartmentAdsService } from './queries/my-apartment-ads/my-apartment-ads.service';
import { ApartmentAdLongTermRentViewResolver } from './resolvers/apartment-ad-long-term-rent/apartment-ad-long-term-rent-view.resolver';
import { ApartmentAdLongTermRentResolver } from './resolvers/apartment-ad-long-term-rent/apartment-ad-long-term-rent.resolver';
import { ApartmentAdShortTermRentViewResolver } from './resolvers/apartment-ad-short-term-rent/apartment-ad-short-term-rent-view.resolver';
import { ApartmentAdShortTermRentResolver } from './resolvers/apartment-ad-short-term-rent/apartment-ad-short-term-rent.resolver';
import { ApartmentAdMutationGraphqlResolver } from './resolvers/apartment-ad.mutation.resolver';
import { ApartmentAdQueryGraphqlResolver } from './resolvers/apartment-ad.query.resolver';
import { ApartmentAdViewResolver } from './resolvers/apartment-ad/apartment-ad-view.resolver';
import { ApartmentAdResolver } from './resolvers/apartment-ad/apartment-ad.resolver';

const graphqlResolvers = [
  ApartmentAdMutationGraphqlResolver,
  ApartmentAdQueryGraphqlResolver,
  ApartmentAdResolver,
  ApartmentAdViewResolver,
  ApartmentAdShortTermRentResolver,
  ApartmentAdShortTermRentViewResolver,
  ApartmentAdLongTermRentResolver,
  ApartmentAdLongTermRentViewResolver,
];

const commands = [
  CreateApartmentAdService,
  CreateApartmentAdIdentificatorService,
  EditApartmentAdService,
  EditApartmentAdAddressService,
  EditApartmentAdDescriptionService,
  EditApartmentAdDetailsService,
  EditApartmentAdImportantInfoService,
  EditApartmentAdMediaService,
  EditApartmentAdTypeService,
  SendToApproveApartmentAdService,
  PauseApartmentAdByTypeHandler,
  PublishApartmentAdByTypeHandler,
  AddApartmentAdOwnershipDocumentsService,
  ApproveAdLongTermRentHandler,
  ApproveAdShortTermRentHandler,
  RejectAdLongTermRentHandler,
  RejectAdShortTermRentHandler,
  AddApartmentAdPaymentMethodService,
  EditShortTermRentAvailabilityService,
  ShortTermSwitchRentBookingTypeService,
  FindApartmentMetatagsHandler,
  UpdateApartmentAdIdentificatorService,

  AdminDeleteApartmentAdHandler,
  AdminDeleteApartmentIdentificatorHandler,
  DeleteApartmentAdService,
  AdminEditApartmentAdDescriptionHandler,
  ApartmentSlugUpdateHandler,
  ApartmentsTitlesUpdateHandler,
  AdminEditApartmentAdMetaTagHandler,
  AdminGetApartmentAdMetaTagHandler,
];

const queries = [
  MyApartmentAdService,
  MyApartmentAdsService,
  MyApartmentAdStatusCountService,
  FindLongTermRentAdsService,
  FindShortTermRentAdsService,
  FindLongTermRentAdService,
  FindShortTermRentAdService,
  FindShortTermRentAdsClusterService,
  FindLongTermRentAdsClusterService,
  FindApartmentAdIdentificatorService,
];

@Module({
  imports: [ElasticsearchCoreModule, CqrsModule, RentalContextDomainRepositoriesModule],
  providers: [...graphqlResolvers, ...commands, ...queries],
})
export class ApartmentAdModule {}
