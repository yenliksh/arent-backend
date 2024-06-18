"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdMutationGraphqlResolver = void 0;
const apartment_ad_identificator_repository_1 = require("../../../domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository");
const apartment_ad_repository_1 = require("../../../domain-repositories/apartment-ad/apartment-ad.repository");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const long_term_rent_document_repository_1 = require("../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository");
const short_term_rent_document_repository_1 = require("../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const guards_1 = require("../../../../infrastructure/guards");
const problem_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/problem.response.dto");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const graphql_1 = require("@nestjs/graphql");
const add_apatment_ad_ownership_documents_request_dto_1 = require("../commands/add-apatment-ad-ownership-documents/add-apatment-ad-ownership-documents.request.dto");
const add_apatment_ad_ownership_documents_service_1 = require("../commands/add-apatment-ad-ownership-documents/add-apatment-ad-ownership-documents.service");
const add_apatment_ad_payment_method_request_dto_1 = require("../commands/add-apatment-ad-payment-method/add-apatment-ad-payment-method.request.dto");
const add_apatment_ad_payment_method_service_1 = require("../commands/add-apatment-ad-payment-method/add-apatment-ad-payment-method.service");
const create_apartment_ad_identificator_request_dto_1 = require("../commands/create-apartment-ad-identificator/create-apartment-ad-identificator.request.dto");
const create_apartment_ad_identificator_service_1 = require("../commands/create-apartment-ad-identificator/create-apartment-ad-identificator.service");
const create_apartment_ad_request_dto_1 = require("../commands/create-apartment-ad/create-apartment-ad.request.dto");
const create_apartment_ad_service_1 = require("../commands/create-apartment-ad/create-apartment-ad.service");
const delete_apartment_ad_request_dto_1 = require("../commands/delete-apartment-ad/delete-apartment-ad.request.dto");
const delete_apartment_ad_service_1 = require("../commands/delete-apartment-ad/delete-apartment-ad.service");
const edit_apartment_ad_address_request_dto_1 = require("../commands/edit-apartment-ad-address/edit-apartment-ad-address.request.dto");
const edit_apartment_ad_address_service_1 = require("../commands/edit-apartment-ad-address/edit-apartment-ad-address.service");
const edit_apartment_ad_description_request_dto_1 = require("../commands/edit-apartment-ad-description/edit-apartment-ad-description.request.dto");
const edit_apartment_ad_description_service_1 = require("../commands/edit-apartment-ad-description/edit-apartment-ad-description.service");
const edit_apartment_ad_details_request_dto_1 = require("../commands/edit-apartment-ad-details/edit-apartment-ad-details.request.dto");
const edit_apartment_ad_details_service_1 = require("../commands/edit-apartment-ad-details/edit-apartment-ad-details.service");
const edit_apartment_ad_important_info_request_dto_1 = require("../commands/edit-apartment-ad-important-info/edit-apartment-ad-important-info.request.dto");
const edit_apartment_ad_important_info_service_1 = require("../commands/edit-apartment-ad-important-info/edit-apartment-ad-important-info.service");
const edit_apartment_ad_media_request_dto_1 = require("../commands/edit-apartment-ad-media/edit-apartment-ad-media.request.dto");
const edit_apartment_ad_media_service_1 = require("../commands/edit-apartment-ad-media/edit-apartment-ad-media.service");
const edit_apartment_ad_type_request_dto_1 = require("../commands/edit-apartment-ad-type/edit-apartment-ad-type.request.dto");
const edit_apartment_ad_type_service_1 = require("../commands/edit-apartment-ad-type/edit-apartment-ad-type.service");
const edit_apartment_ad_request_dto_1 = require("../commands/edit-apartment-ad/edit-apartment-ad.request.dto");
const edit_apartment_ad_service_1 = require("../commands/edit-apartment-ad/edit-apartment-ad.service");
const edit_short_term_rent_availability_settings_request_dto_1 = require("../commands/edit-short-term-rent-availability-settings/edit-short-term-rent-availability-settings.request.dto");
const edit_short_term_rent_availability_settings_service_1 = require("../commands/edit-short-term-rent-availability-settings/edit-short-term-rent-availability-settings.service");
const pause_apartment_ad_by_type_command_1 = require("../commands/pause-apartment-ad/pause-apartment-ad-by-type.command");
const pause_apartment_ad_request_dto_1 = require("../commands/pause-apartment-ad/pause-apartment-ad.request.dto");
const publish_apartment_ad_by_type_command_1 = require("../commands/publish-apartment-ad/publish-apartment-ad-by-type.command");
const publish_apartment_ad_request_dto_1 = require("../commands/publish-apartment-ad/publish-apartment-ad.request.dto");
const publish_apartment_ad_response_dto_1 = require("../commands/publish-apartment-ad/publish-apartment-ad.response.dto");
const send_to_approve_apartment_ad_request_dto_1 = require("../commands/send-to-approve-apartment-ad/send-to-approve-apartment-ad.request.dto");
const send_to_approve_apartment_ad_service_1 = require("../commands/send-to-approve-apartment-ad/send-to-approve-apartment-ad.service");
const short_term_switch_rent_booking_type_request_dto_1 = require("../commands/short-term-switch-rent-booking-type/short-term-switch-rent-booking-type.request.dto");
const short_term_switch_rent_booking_type_service_1 = require("../commands/short-term-switch-rent-booking-type/short-term-switch-rent-booking-type.service");
const apartment_ad_identificator_response_dto_1 = require("../dtos/apartment-ad-identificator.response.dto");
const apartment_ad_response_dto_1 = require("../dtos/apartment-ad.response.dto");
const my_apartment_ad_service_1 = require("../queries/my-apartment-ad/my-apartment-ad.service");
let ApartmentAdMutationGraphqlResolver = class ApartmentAdMutationGraphqlResolver {
    constructor(createApartmentAdService, createApartmentAdIdentificatorService, editApartmentAdService, editApartmentAdAddressService, editApartmentAdDescriptionService, editApartmentDetailsService, editApartmentAdImportantInfoService, editApartmentMediaService, editShortTermRentAvailabilityService, editApartmentTypeService, sendToApproveApartmentAdService, findMyApartmentAdService, addApartmentAdOwnershipDocumentsService, addApartmentAdPaymentMethodService, deleteApartmentAdService, shortTermSwitchRentBookingTypeService, commandBus, longTermRentDocumentRepository, shortTermRentDocumentRepository, apartmentAdRepository, apartmentAdIdentificatorRepository) {
        this.createApartmentAdService = createApartmentAdService;
        this.createApartmentAdIdentificatorService = createApartmentAdIdentificatorService;
        this.editApartmentAdService = editApartmentAdService;
        this.editApartmentAdAddressService = editApartmentAdAddressService;
        this.editApartmentAdDescriptionService = editApartmentAdDescriptionService;
        this.editApartmentDetailsService = editApartmentDetailsService;
        this.editApartmentAdImportantInfoService = editApartmentAdImportantInfoService;
        this.editApartmentMediaService = editApartmentMediaService;
        this.editShortTermRentAvailabilityService = editShortTermRentAvailabilityService;
        this.editApartmentTypeService = editApartmentTypeService;
        this.sendToApproveApartmentAdService = sendToApproveApartmentAdService;
        this.findMyApartmentAdService = findMyApartmentAdService;
        this.addApartmentAdOwnershipDocumentsService = addApartmentAdOwnershipDocumentsService;
        this.addApartmentAdPaymentMethodService = addApartmentAdPaymentMethodService;
        this.deleteApartmentAdService = deleteApartmentAdService;
        this.shortTermSwitchRentBookingTypeService = shortTermSwitchRentBookingTypeService;
        this.commandBus = commandBus;
        this.longTermRentDocumentRepository = longTermRentDocumentRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
        this.apartmentAdRepository = apartmentAdRepository;
        this.apartmentAdIdentificatorRepository = apartmentAdIdentificatorRepository;
    }
    async createApartmentAd(userId, input) {
        const result = await this.createApartmentAdService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async editApartmentAd(userId, input) {
        const result = await this.editApartmentAdService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async editApartmentAdAddress(userId, input) {
        const result = await this.editApartmentAdAddressService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async editApartmentAdDescription(userId, input) {
        const result = await this.editApartmentAdDescriptionService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async editApartmentAdDetails(userId, input) {
        const result = await this.editApartmentDetailsService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async editApartmentAdImportantInfo(userId, input) {
        const result = await this.editApartmentAdImportantInfoService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async editApartmentAdMedia(userId, input) {
        const result = await this.editApartmentMediaService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async editAvailabilitySettings(userId, input) {
        const result = await this.editShortTermRentAvailabilityService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async editApartmentAdType(userId, input) {
        const result = await this.editApartmentTypeService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async sendToApproveApartmentAd(userId, input) {
        const result = await this.sendToApproveApartmentAdService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async pauseApartmentAd(userId, input) {
        const result = await this.commandBus.execute(new pause_apartment_ad_by_type_command_1.PauseApartmentAdByTypeCommand(input.id, input.periodType));
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async publishApartmentAd(userId, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(publish_apartment_ad_response_dto_1.PublishApartmentAdResponse, async () => {
            const result = await this.commandBus.execute(new publish_apartment_ad_by_type_command_1.PublishApartmentAdByTypeCommand(input.id, input.periodType));
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return publish_apartment_ad_response_dto_1.PublishApartmentAdResponse.create(queryResult.unwrap());
        });
    }
    async addOwnershipDocuments(userId, input) {
        const result = await this.addApartmentAdOwnershipDocumentsService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async addPaymentMethod(userId, input) {
        const result = await this.addApartmentAdPaymentMethodService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
        if (queryResult.isErr()) {
            throw queryResult.unwrapErr();
        }
        return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
    }
    async deleteApartmentAd(userId, input) {
        const result = await this.deleteApartmentAdService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return result.isOk();
    }
    async shortTermSwitchRentBookingType(userId, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(publish_apartment_ad_response_dto_1.PublishApartmentAdResponse, async () => {
            const result = await this.shortTermSwitchRentBookingTypeService.handle(input, userId);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);
            if (queryResult.isErr()) {
                throw queryResult.unwrapErr();
            }
            return apartment_ad_response_dto_1.ApartmentAdResponse.create(queryResult.unwrap());
        });
    }
    async createApartmentAdIdentificator(input) {
        const result = await this.createApartmentAdIdentificatorService.handle(input);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return apartment_ad_identificator_response_dto_1.ApartmentAdIdentificatorResponse.create({ apartmentId: result.unwrap().value });
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__create' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_apartment_ad_request_dto_1.CreateApartmentAdRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "createApartmentAd", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__edit' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_apartment_ad_request_dto_1.EditApartmentAdRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "editApartmentAd", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__edit_address' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_apartment_ad_address_request_dto_1.EditApartmentAdAddressRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "editApartmentAdAddress", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__edit_description' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_apartment_ad_description_request_dto_1.EditApartmentAdDescriptionRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "editApartmentAdDescription", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__edit_details' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_apartment_ad_details_request_dto_1.EditApartmentAdDetailsRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "editApartmentAdDetails", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__edit_importantInfo' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_apartment_ad_important_info_request_dto_1.EditApartmentAdImportantInfoRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "editApartmentAdImportantInfo", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__edit_media' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_apartment_ad_media_request_dto_1.EditApartmentAdMediaRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "editApartmentAdMedia", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, {
        name: 'rentAd__edit_availabilitySettings',
        description: 'These settings only affect short-term rental ads',
    }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_short_term_rent_availability_settings_request_dto_1.EditShortTermRentAvailabilitySettingsRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "editAvailabilitySettings", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__edit_type' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, edit_apartment_ad_type_request_dto_1.EditApartmentAdTypeRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "editApartmentAdType", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__send_to_approve' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, send_to_approve_apartment_ad_request_dto_1.SendToApproveApartmentAdRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "sendToApproveApartmentAd", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__pause' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pause_apartment_ad_request_dto_1.PauseApartmentAdRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "pauseApartmentAd", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => publish_apartment_ad_response_dto_1.PublishApartmentAdResponse, { name: 'rentAd__publish' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, publish_apartment_ad_request_dto_1.PublishApartmentAdRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "publishApartmentAd", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__add_ownershipDocs' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_apatment_ad_ownership_documents_request_dto_1.AddApartmentAdOwnershipDocumentRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "addOwnershipDocuments", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__add_paymentMethod' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_apatment_ad_payment_method_request_dto_1.AddApartmentAdPaymentMethodRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "addPaymentMethod", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => Boolean, { name: 'rentAd__delete' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_apartment_ad_request_dto_1.DeleteApartmentAdRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "deleteApartmentAd", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_response_dto_1.ApartmentAdResponse, { name: 'rentAd__shortTerm_switchRentBookingType' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, short_term_switch_rent_booking_type_request_dto_1.ShortTermSwitchRentBookingTypeRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "shortTermSwitchRentBookingType", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => apartment_ad_identificator_response_dto_1.ApartmentAdIdentificatorResponse, { name: 'rentAdIdentificator__create' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_apartment_ad_identificator_request_dto_1.CreateApartmentAdIdentificatorRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdMutationGraphqlResolver.prototype, "createApartmentAdIdentificator", null);
ApartmentAdMutationGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)('ApartmentAd'),
    __metadata("design:paramtypes", [create_apartment_ad_service_1.CreateApartmentAdService,
        create_apartment_ad_identificator_service_1.CreateApartmentAdIdentificatorService,
        edit_apartment_ad_service_1.EditApartmentAdService,
        edit_apartment_ad_address_service_1.EditApartmentAdAddressService,
        edit_apartment_ad_description_service_1.EditApartmentAdDescriptionService,
        edit_apartment_ad_details_service_1.EditApartmentAdDetailsService,
        edit_apartment_ad_important_info_service_1.EditApartmentAdImportantInfoService,
        edit_apartment_ad_media_service_1.EditApartmentAdMediaService,
        edit_short_term_rent_availability_settings_service_1.EditShortTermRentAvailabilityService,
        edit_apartment_ad_type_service_1.EditApartmentAdTypeService,
        send_to_approve_apartment_ad_service_1.SendToApproveApartmentAdService,
        my_apartment_ad_service_1.MyApartmentAdService,
        add_apatment_ad_ownership_documents_service_1.AddApartmentAdOwnershipDocumentsService,
        add_apatment_ad_payment_method_service_1.AddApartmentAdPaymentMethodService,
        delete_apartment_ad_service_1.DeleteApartmentAdService,
        short_term_switch_rent_booking_type_service_1.ShortTermSwitchRentBookingTypeService,
        cqrs_1.CommandBus,
        long_term_rent_document_repository_1.LongTermRentDocumentRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository,
        apartment_ad_repository_1.ApartmentAdRepository,
        apartment_ad_identificator_repository_1.ApartmentAdIdentificatorRepository])
], ApartmentAdMutationGraphqlResolver);
exports.ApartmentAdMutationGraphqlResolver = ApartmentAdMutationGraphqlResolver;
//# sourceMappingURL=apartment-ad.mutation.resolver.js.map