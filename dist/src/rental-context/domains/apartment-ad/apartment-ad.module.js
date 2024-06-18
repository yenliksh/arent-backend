"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const elasticsearch_core_module_1 = require("../../../infrastructure/elastic-search/elasticsearch-core.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const add_apatment_ad_ownership_documents_service_1 = require("./commands/add-apatment-ad-ownership-documents/add-apatment-ad-ownership-documents.service");
const add_apatment_ad_payment_method_service_1 = require("./commands/add-apatment-ad-payment-method/add-apatment-ad-payment-method.service");
const admin_delete_apartment_ad_handler_1 = require("./commands/admins/admin-delete-apartment-ad/admin-delete-apartment-ad.handler");
const admin_delete_apartment_identificator_handler_1 = require("./commands/admins/admin-delete-apartment-identificator/admin-delete-apartment-identificator.handler");
const admin_edit_apartment_ad_description_handler_1 = require("./commands/admins/admin-edit-apartment-ad-description/admin-edit-apartment-ad-description.handler");
const admin_edit_apartment_ad_meta_tag_handler_1 = require("./commands/admins/admin-edit-apartment-ad-meta-tag/admin-edit-apartment-ad-meta-tag.handler");
const admin_get_apartment_ad_meta_tag_handler_1 = require("./commands/admins/admin-get-apartment-ad-meta-tag/admin-get-apartment-ad-meta-tag.handler");
const aprove_ad_long_term_rent_handler_1 = require("./commands/approve-ad-long-term-rent/aprove-ad-long-term-rent.handler");
const aprove_ad_short_term_rent_handler_1 = require("./commands/approve-ad-short-term-rent/aprove-ad-short-term-rent.handler");
const create_apartment_ad_identificator_service_1 = require("./commands/create-apartment-ad-identificator/create-apartment-ad-identificator.service");
const create_apartment_ad_service_1 = require("./commands/create-apartment-ad/create-apartment-ad.service");
const delete_apartment_ad_service_1 = require("./commands/delete-apartment-ad/delete-apartment-ad.service");
const edit_apartment_ad_address_service_1 = require("./commands/edit-apartment-ad-address/edit-apartment-ad-address.service");
const edit_apartment_ad_description_service_1 = require("./commands/edit-apartment-ad-description/edit-apartment-ad-description.service");
const edit_apartment_ad_details_service_1 = require("./commands/edit-apartment-ad-details/edit-apartment-ad-details.service");
const edit_apartment_ad_important_info_service_1 = require("./commands/edit-apartment-ad-important-info/edit-apartment-ad-important-info.service");
const edit_apartment_ad_media_service_1 = require("./commands/edit-apartment-ad-media/edit-apartment-ad-media.service");
const edit_apartment_ad_type_service_1 = require("./commands/edit-apartment-ad-type/edit-apartment-ad-type.service");
const edit_apartment_ad_service_1 = require("./commands/edit-apartment-ad/edit-apartment-ad.service");
const edit_short_term_rent_availability_settings_service_1 = require("./commands/edit-short-term-rent-availability-settings/edit-short-term-rent-availability-settings.service");
const find_apartment_ad_identificator_service_1 = require("./commands/find-apartment-ad-identificator/find-apartment-ad-identificator.service");
const find_apartment_metatags_handler_1 = require("./commands/find-apartment-metatags/find-apartment-metatags.handler");
const pause_apartment_ad_by_type_handler_1 = require("./commands/pause-apartment-ad/pause-apartment-ad-by-type.handler");
const publish_apartment_ad_by_type_handler_1 = require("./commands/publish-apartment-ad/publish-apartment-ad-by-type.handler");
const reject_ad_long_term_rent_handler_1 = require("./commands/reject-ad-long-term-rent/reject-ad-long-term-rent.handler");
const reject_ad_short_rent_handler_1 = require("./commands/reject-ad-short-term-rent/reject-ad.short-rent.handler");
const send_to_approve_apartment_ad_service_1 = require("./commands/send-to-approve-apartment-ad/send-to-approve-apartment-ad.service");
const short_term_switch_rent_booking_type_service_1 = require("./commands/short-term-switch-rent-booking-type/short-term-switch-rent-booking-type.service");
const update_apartment_ad_identificator_service_1 = require("./commands/update-apartment-ad-identificator/update-apartment-ad-identificator.service");
const apartment_slug_update_handler_1 = require("./cron/commands/apartment-slug-update.handler");
const apartments_titles_update_handler_1 = require("./cron/commands/apartments-titles-update.handler");
const find_long_term_rent_ad_service_1 = require("./queries/find-long-term-rent-ad/find-long-term-rent-ad.service");
const find_long_term_rent_ads_cluster_service_1 = require("./queries/find-long-term-rent-ads-cluster/find-long-term-rent-ads-cluster.service");
const find_long_term_rent_ads_service_1 = require("./queries/find-long-term-rent-ads/find-long-term-rent-ads.service");
const find_short_term_rent_ad_service_1 = require("./queries/find-short-term-rent-ad/find-short-term-rent-ad.service");
const find_short_term_rent_ads_cluster_service_1 = require("./queries/find-short-term-rent-ads-cluster/find-short-term-rent-ads-cluster.service");
const find_short_term_rent_ads_service_1 = require("./queries/find-short-term-rent-ads/find-short-term-rent-ads.service");
const my_apartment_ad_status_count_service_1 = require("./queries/my-apartment-ad-status-count/my-apartment-ad-status-count.service");
const my_apartment_ad_service_1 = require("./queries/my-apartment-ad/my-apartment-ad.service");
const my_apartment_ads_service_1 = require("./queries/my-apartment-ads/my-apartment-ads.service");
const apartment_ad_long_term_rent_view_resolver_1 = require("./resolvers/apartment-ad-long-term-rent/apartment-ad-long-term-rent-view.resolver");
const apartment_ad_long_term_rent_resolver_1 = require("./resolvers/apartment-ad-long-term-rent/apartment-ad-long-term-rent.resolver");
const apartment_ad_short_term_rent_view_resolver_1 = require("./resolvers/apartment-ad-short-term-rent/apartment-ad-short-term-rent-view.resolver");
const apartment_ad_short_term_rent_resolver_1 = require("./resolvers/apartment-ad-short-term-rent/apartment-ad-short-term-rent.resolver");
const apartment_ad_mutation_resolver_1 = require("./resolvers/apartment-ad.mutation.resolver");
const apartment_ad_query_resolver_1 = require("./resolvers/apartment-ad.query.resolver");
const apartment_ad_view_resolver_1 = require("./resolvers/apartment-ad/apartment-ad-view.resolver");
const apartment_ad_resolver_1 = require("./resolvers/apartment-ad/apartment-ad.resolver");
const graphqlResolvers = [
    apartment_ad_mutation_resolver_1.ApartmentAdMutationGraphqlResolver,
    apartment_ad_query_resolver_1.ApartmentAdQueryGraphqlResolver,
    apartment_ad_resolver_1.ApartmentAdResolver,
    apartment_ad_view_resolver_1.ApartmentAdViewResolver,
    apartment_ad_short_term_rent_resolver_1.ApartmentAdShortTermRentResolver,
    apartment_ad_short_term_rent_view_resolver_1.ApartmentAdShortTermRentViewResolver,
    apartment_ad_long_term_rent_resolver_1.ApartmentAdLongTermRentResolver,
    apartment_ad_long_term_rent_view_resolver_1.ApartmentAdLongTermRentViewResolver,
];
const commands = [
    create_apartment_ad_service_1.CreateApartmentAdService,
    create_apartment_ad_identificator_service_1.CreateApartmentAdIdentificatorService,
    edit_apartment_ad_service_1.EditApartmentAdService,
    edit_apartment_ad_address_service_1.EditApartmentAdAddressService,
    edit_apartment_ad_description_service_1.EditApartmentAdDescriptionService,
    edit_apartment_ad_details_service_1.EditApartmentAdDetailsService,
    edit_apartment_ad_important_info_service_1.EditApartmentAdImportantInfoService,
    edit_apartment_ad_media_service_1.EditApartmentAdMediaService,
    edit_apartment_ad_type_service_1.EditApartmentAdTypeService,
    send_to_approve_apartment_ad_service_1.SendToApproveApartmentAdService,
    pause_apartment_ad_by_type_handler_1.PauseApartmentAdByTypeHandler,
    publish_apartment_ad_by_type_handler_1.PublishApartmentAdByTypeHandler,
    add_apatment_ad_ownership_documents_service_1.AddApartmentAdOwnershipDocumentsService,
    aprove_ad_long_term_rent_handler_1.ApproveAdLongTermRentHandler,
    aprove_ad_short_term_rent_handler_1.ApproveAdShortTermRentHandler,
    reject_ad_long_term_rent_handler_1.RejectAdLongTermRentHandler,
    reject_ad_short_rent_handler_1.RejectAdShortTermRentHandler,
    add_apatment_ad_payment_method_service_1.AddApartmentAdPaymentMethodService,
    edit_short_term_rent_availability_settings_service_1.EditShortTermRentAvailabilityService,
    short_term_switch_rent_booking_type_service_1.ShortTermSwitchRentBookingTypeService,
    find_apartment_metatags_handler_1.FindApartmentMetatagsHandler,
    update_apartment_ad_identificator_service_1.UpdateApartmentAdIdentificatorService,
    admin_delete_apartment_ad_handler_1.AdminDeleteApartmentAdHandler,
    admin_delete_apartment_identificator_handler_1.AdminDeleteApartmentIdentificatorHandler,
    delete_apartment_ad_service_1.DeleteApartmentAdService,
    admin_edit_apartment_ad_description_handler_1.AdminEditApartmentAdDescriptionHandler,
    apartment_slug_update_handler_1.ApartmentSlugUpdateHandler,
    apartments_titles_update_handler_1.ApartmentsTitlesUpdateHandler,
    admin_edit_apartment_ad_meta_tag_handler_1.AdminEditApartmentAdMetaTagHandler,
    admin_get_apartment_ad_meta_tag_handler_1.AdminGetApartmentAdMetaTagHandler,
];
const queries = [
    my_apartment_ad_service_1.MyApartmentAdService,
    my_apartment_ads_service_1.MyApartmentAdsService,
    my_apartment_ad_status_count_service_1.MyApartmentAdStatusCountService,
    find_long_term_rent_ads_service_1.FindLongTermRentAdsService,
    find_short_term_rent_ads_service_1.FindShortTermRentAdsService,
    find_long_term_rent_ad_service_1.FindLongTermRentAdService,
    find_short_term_rent_ad_service_1.FindShortTermRentAdService,
    find_short_term_rent_ads_cluster_service_1.FindShortTermRentAdsClusterService,
    find_long_term_rent_ads_cluster_service_1.FindLongTermRentAdsClusterService,
    find_apartment_ad_identificator_service_1.FindApartmentAdIdentificatorService,
];
let ApartmentAdModule = class ApartmentAdModule {
};
ApartmentAdModule = __decorate([
    (0, common_1.Module)({
        imports: [elasticsearch_core_module_1.ElasticsearchCoreModule, cqrs_1.CqrsModule, rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule],
        providers: [...graphqlResolvers, ...commands, ...queries],
    })
], ApartmentAdModule);
exports.ApartmentAdModule = ApartmentAdModule;
//# sourceMappingURL=apartment-ad.module.js.map