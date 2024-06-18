import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { HttpException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Result } from 'oxide.ts';

import { AddApartmentAdOwnershipDocumentRequest } from '../commands/add-apatment-ad-ownership-documents/add-apatment-ad-ownership-documents.request.dto';
import { AddApartmentAdOwnershipDocumentsService } from '../commands/add-apatment-ad-ownership-documents/add-apatment-ad-ownership-documents.service';
import { AddApartmentAdPaymentMethodRequest } from '../commands/add-apatment-ad-payment-method/add-apatment-ad-payment-method.request.dto';
import { AddApartmentAdPaymentMethodService } from '../commands/add-apatment-ad-payment-method/add-apatment-ad-payment-method.service';
import { CreateApartmentAdIdentificatorRequest } from '../commands/create-apartment-ad-identificator/create-apartment-ad-identificator.request.dto';
import { CreateApartmentAdIdentificatorService } from '../commands/create-apartment-ad-identificator/create-apartment-ad-identificator.service';
import { CreateApartmentAdRequest } from '../commands/create-apartment-ad/create-apartment-ad.request.dto';
import { CreateApartmentAdService } from '../commands/create-apartment-ad/create-apartment-ad.service';
import { DeleteApartmentAdRequest } from '../commands/delete-apartment-ad/delete-apartment-ad.request.dto';
import { DeleteApartmentAdService } from '../commands/delete-apartment-ad/delete-apartment-ad.service';
import { EditApartmentAdAddressRequest } from '../commands/edit-apartment-ad-address/edit-apartment-ad-address.request.dto';
import { EditApartmentAdAddressService } from '../commands/edit-apartment-ad-address/edit-apartment-ad-address.service';
import { EditApartmentAdDescriptionRequest } from '../commands/edit-apartment-ad-description/edit-apartment-ad-description.request.dto';
import { EditApartmentAdDescriptionService } from '../commands/edit-apartment-ad-description/edit-apartment-ad-description.service';
import { EditApartmentAdDetailsRequest } from '../commands/edit-apartment-ad-details/edit-apartment-ad-details.request.dto';
import { EditApartmentAdDetailsService } from '../commands/edit-apartment-ad-details/edit-apartment-ad-details.service';
import { EditApartmentAdImportantInfoRequest } from '../commands/edit-apartment-ad-important-info/edit-apartment-ad-important-info.request.dto';
import { EditApartmentAdImportantInfoService } from '../commands/edit-apartment-ad-important-info/edit-apartment-ad-important-info.service';
import { EditApartmentAdMediaRequest } from '../commands/edit-apartment-ad-media/edit-apartment-ad-media.request.dto';
import { EditApartmentAdMediaService } from '../commands/edit-apartment-ad-media/edit-apartment-ad-media.service';
import { EditApartmentAdTypeRequest } from '../commands/edit-apartment-ad-type/edit-apartment-ad-type.request.dto';
import { EditApartmentAdTypeService } from '../commands/edit-apartment-ad-type/edit-apartment-ad-type.service';
import { EditApartmentAdRequest } from '../commands/edit-apartment-ad/edit-apartment-ad.request.dto';
import { EditApartmentAdService } from '../commands/edit-apartment-ad/edit-apartment-ad.service';
import { EditShortTermRentAvailabilitySettingsRequest } from '../commands/edit-short-term-rent-availability-settings/edit-short-term-rent-availability-settings.request.dto';
import { EditShortTermRentAvailabilityService } from '../commands/edit-short-term-rent-availability-settings/edit-short-term-rent-availability-settings.service';
import { PauseApartmentAdByTypeCommand } from '../commands/pause-apartment-ad/pause-apartment-ad-by-type.command';
import { PauseApartmentAdRequest } from '../commands/pause-apartment-ad/pause-apartment-ad.request.dto';
import { PublishApartmentAdByTypeCommand } from '../commands/publish-apartment-ad/publish-apartment-ad-by-type.command';
import { PublishApartmentAdRequest } from '../commands/publish-apartment-ad/publish-apartment-ad.request.dto';
import { PublishApartmentAdResponse } from '../commands/publish-apartment-ad/publish-apartment-ad.response.dto';
import { SendToApproveApartmentAdRequest } from '../commands/send-to-approve-apartment-ad/send-to-approve-apartment-ad.request.dto';
import { SendToApproveApartmentAdService } from '../commands/send-to-approve-apartment-ad/send-to-approve-apartment-ad.service';
import { ShortTermSwitchRentBookingTypeRequest } from '../commands/short-term-switch-rent-booking-type/short-term-switch-rent-booking-type.request.dto';
import { ShortTermSwitchRentBookingTypeService } from '../commands/short-term-switch-rent-booking-type/short-term-switch-rent-booking-type.service';
import { ApartmentAdIdentificatorResponse } from '../dtos/apartment-ad-identificator.response.dto';
import { ApartmentAdResponse } from '../dtos/apartment-ad.response.dto';
import { MyApartmentAdService } from '../queries/my-apartment-ad/my-apartment-ad.service';

@Resolver('ApartmentAd')
export class ApartmentAdMutationGraphqlResolver {
  constructor(
    private readonly createApartmentAdService: CreateApartmentAdService,
    private readonly createApartmentAdIdentificatorService: CreateApartmentAdIdentificatorService,
    private readonly editApartmentAdService: EditApartmentAdService,
    private readonly editApartmentAdAddressService: EditApartmentAdAddressService,
    private readonly editApartmentAdDescriptionService: EditApartmentAdDescriptionService,
    private readonly editApartmentDetailsService: EditApartmentAdDetailsService,
    private readonly editApartmentAdImportantInfoService: EditApartmentAdImportantInfoService,
    private readonly editApartmentMediaService: EditApartmentAdMediaService,
    private readonly editShortTermRentAvailabilityService: EditShortTermRentAvailabilityService,
    private readonly editApartmentTypeService: EditApartmentAdTypeService,
    private readonly sendToApproveApartmentAdService: SendToApproveApartmentAdService,
    private readonly findMyApartmentAdService: MyApartmentAdService,
    private readonly addApartmentAdOwnershipDocumentsService: AddApartmentAdOwnershipDocumentsService,
    private readonly addApartmentAdPaymentMethodService: AddApartmentAdPaymentMethodService,
    private readonly deleteApartmentAdService: DeleteApartmentAdService,
    private readonly shortTermSwitchRentBookingTypeService: ShortTermSwitchRentBookingTypeService,
    private commandBus: CommandBus,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository,
  ) {}

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__create' })
  async createApartmentAd(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: CreateApartmentAdRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.createApartmentAdService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__edit' })
  async editApartmentAd(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: EditApartmentAdRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.editApartmentAdService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__edit_address' })
  async editApartmentAdAddress(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: EditApartmentAdAddressRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.editApartmentAdAddressService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__edit_description' })
  async editApartmentAdDescription(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: EditApartmentAdDescriptionRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.editApartmentAdDescriptionService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__edit_details' })
  async editApartmentAdDetails(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: EditApartmentAdDetailsRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.editApartmentDetailsService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__edit_importantInfo' })
  async editApartmentAdImportantInfo(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: EditApartmentAdImportantInfoRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.editApartmentAdImportantInfoService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__edit_media' })
  async editApartmentAdMedia(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: EditApartmentAdMediaRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.editApartmentMediaService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, {
    name: 'rentAd__edit_availabilitySettings',
    description: 'These settings only affect short-term rental ads',
  })
  async editAvailabilitySettings(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: EditShortTermRentAvailabilitySettingsRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.editShortTermRentAvailabilityService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__edit_type' })
  async editApartmentAdType(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: EditApartmentAdTypeRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.editApartmentTypeService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__send_to_approve' })
  async sendToApproveApartmentAd(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: SendToApproveApartmentAdRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.sendToApproveApartmentAdService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__pause' })
  async pauseApartmentAd(@IAM('id') userId: UserOrmEntity['id'], @Args('input') input: PauseApartmentAdRequest) {
    const result = await this.commandBus.execute<PauseApartmentAdByTypeCommand, Result<UUID, HttpException>>(
      new PauseApartmentAdByTypeCommand(input.id, input.periodType),
    );

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => PublishApartmentAdResponse, { name: 'rentAd__publish' })
  async publishApartmentAd(@IAM('id') userId: UserOrmEntity['id'], @Args('input') input: PublishApartmentAdRequest) {
    return ProblemResponse.catchProblems(PublishApartmentAdResponse, async () => {
      const result = await this.commandBus.execute<
        PublishApartmentAdByTypeCommand,
        Result<UUID, HttpException | LocalizedProblem>
      >(new PublishApartmentAdByTypeCommand(input.id, input.periodType));

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return PublishApartmentAdResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__add_ownershipDocs' })
  async addOwnershipDocuments(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: AddApartmentAdOwnershipDocumentRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.addApartmentAdOwnershipDocumentsService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__add_paymentMethod' })
  async addPaymentMethod(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: AddApartmentAdPaymentMethodRequest,
  ): Promise<ApartmentAdResponse> {
    const result = await this.addApartmentAdPaymentMethodService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return ApartmentAdResponse.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => Boolean, { name: 'rentAd__delete' })
  async deleteApartmentAd(@IAM('id') userId: UserOrmEntity['id'], @Args('input') input: DeleteApartmentAdRequest) {
    const result = await this.deleteApartmentAdService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return result.isOk();
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdResponse, { name: 'rentAd__shortTerm_switchRentBookingType' })
  async shortTermSwitchRentBookingType(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: ShortTermSwitchRentBookingTypeRequest,
  ) {
    return ProblemResponse.catchProblems(PublishApartmentAdResponse, async () => {
      const result = await this.shortTermSwitchRentBookingTypeService.handle(input, userId);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findMyApartmentAdService.handle({ id: result.unwrap().value }, userId);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ApartmentAdResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdIdentificatorResponse, { name: 'rentAdIdentificator__create' })
  async createApartmentAdIdentificator(
    @Args('input') input: CreateApartmentAdIdentificatorRequest,
  ): Promise<ApartmentAdIdentificatorResponse> {
    const result = await this.createApartmentAdIdentificatorService.handle(input);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ApartmentAdIdentificatorResponse.create({ apartmentId: result.unwrap().value });
  }
}
