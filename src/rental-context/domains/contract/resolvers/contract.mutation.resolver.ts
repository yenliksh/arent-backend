import { InnopayCardModel } from '@domains/innopay-card/models/innopay-card.model';
import { FindMyCardService } from '@domains/innopay-card/queries/find-my-card/find-my-card.service';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AcceptContractOfferRequest } from '../commands/accept-contract-offer/accept-contract-offer.request.dto';
import { AcceptContractOfferService } from '../commands/accept-contract-offer/accept-contract-offer.service';
import { CancelContractByTenantRequest } from '../commands/cancel-contract-by-tenant/cancel-contract-by-tenant.request.dto';
import { CancelContractByTenantService } from '../commands/cancel-contract-by-tenant/cancel-contract-by-tenant.service';
import { ChangeTenantPaymentMethodRequest } from '../commands/change-tenant-payment-method/change-tenant-payment-method.request.dto';
import { ChangeTenantPaymentMethodService } from '../commands/change-tenant-payment-method/change-tenant-payment-method.service';
import { ContractTemporaryConcludeRequest } from '../commands/contract-temporary-conclude/contract-temporary-conclude.request';
import { ContractTemporaryConcludeService } from '../commands/contract-temporary-conclude/contract-temporary-conclude.service';
import { ContractTemporaryInstantConcludeRequest } from '../commands/contract-temporary-instant-conclude/contract-temporary-instant-conclude.request';
import { ContractTemporaryInstantConcludeService } from '../commands/contract-temporary-instant-conclude/contract-temporary-instant-conclude.service';
import { RejectContractOfferRequest } from '../commands/reject-contract-offer/reject-contract-offer.request.dto';
import { RejectContractOfferService } from '../commands/reject-contract-offer/reject-contract-offer.service';
import { SendContractOfferEmailResponse } from '../commands/send-contract-offer-email/send-contract-offer-email-response.dto';
import { SendOfferEmail } from '../commands/send-contract-offer-email/send-contract-offer-email.dto';
import { SendContractOfferEmailService } from '../commands/send-contract-offer-email/send-contract-offer-email.service';
import { SendOfferStatusEmail } from '../commands/send-contract-offer-status-email/send-contract-offer-status-email';
import { SendContractOfferStatusEmailResponse } from '../commands/send-contract-offer-status-email/send-contract-offer-status-email.response';
import { SendContractOfferStatusEmailService } from '../commands/send-contract-offer-status-email/send-contract-offer-status-email.service';
import { SendContractOfferRequest } from '../commands/send-contract-offer/send-contract-offer.request.dto';
import { SendContractOfferService } from '../commands/send-contract-offer/send-contract-offer.service';
import { ContractResponse } from '../dtos/contract.response.dto';
import { FindContractService } from '../queries/find-contract/find-contract.service';

@Resolver()
export class ContractMutationGraphqlResolver {
  constructor(
    private readonly sendOfferService: SendContractOfferService,
    private readonly acceptOfferService: AcceptContractOfferService,
    private readonly rejectOfferService: RejectContractOfferService,
    private readonly changeTenantPaymentMethodService: ChangeTenantPaymentMethodService,
    private readonly cancelContractByTenantService: CancelContractByTenantService,
    private readonly contractTemporaryConcludeService: ContractTemporaryConcludeService,
    private readonly contractTemporaryInstantConcludeService: ContractTemporaryInstantConcludeService,
    private readonly findByIdService: FindContractService,
    private readonly findMyCardByIdService: FindMyCardService,
    private readonly sendContractOfferStatusEmailService: SendContractOfferStatusEmailService,
    private readonly sendContractOfferEmailService: SendContractOfferEmailService,
  ) {}

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ContractResponse, { name: 'contractOffer__acceptByNewCard' })
  async temporaryConclude(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: ContractTemporaryConcludeRequest,
  ): Promise<ContractResponse> {
    return ProblemResponse.catchProblems(ContractResponse, async () => {
      const result = await this.contractTemporaryConcludeService.handle(input, iam.id);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ContractResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ContractResponse, { name: 'contractInstantBooking__byNewCard' })
  async temporaryInstantBooking(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: ContractTemporaryInstantConcludeRequest,
  ): Promise<ContractResponse> {
    return ProblemResponse.catchProblems(ContractResponse, async () => {
      const result = await this.contractTemporaryInstantConcludeService.handle(input, iam.id);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ContractResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ContractResponse, { name: 'contractOffer__send' })
  async sendOffer(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: SendContractOfferRequest,
  ): Promise<ContractResponse> {
    return ProblemResponse.catchProblems(ContractResponse, async () => {
      const result = await this.sendOfferService.handle(input, new UUID(iam.id));

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ContractResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ContractResponse, { name: 'contractOffer__accept' })
  async acceptOffer(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: AcceptContractOfferRequest,
  ): Promise<ContractResponse> {
    return ProblemResponse.catchProblems(ContractResponse, async () => {
      const result = await this.acceptOfferService.handle(input, iam.id);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ContractResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ContractResponse, { name: 'contractOffer__reject' })
  async rejectOffer(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: RejectContractOfferRequest,
  ): Promise<ContractResponse> {
    return ProblemResponse.catchProblems(ContractResponse, async () => {
      const result = await this.rejectOfferService.handle(input, iam.id);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ContractResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => InnopayCardModel, { name: 'contractTenantPaymentMethod__change' })
  async changeTenantPaymentMethod(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: ChangeTenantPaymentMethodRequest,
  ): Promise<InnopayCardModel> {
    const result = await this.changeTenantPaymentMethodService.handle(input, iam.id);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await this.findMyCardByIdService.handle({ id: result.unwrap().value }, iam.id);

    if (queryResult.isErr()) {
      throw queryResult.unwrapErr();
    }

    return InnopayCardModel.create(queryResult.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ContractResponse, { name: 'contractTenant__cancel' })
  async cancelByTenant(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: CancelContractByTenantRequest,
  ): Promise<ContractResponse> {
    return ProblemResponse.catchProblems(ContractResponse, async () => {
      const result = await this.cancelContractByTenantService.handle(input, iam.id);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ContractResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => SendContractOfferStatusEmailResponse, {
    name: 'contractOfferStatus__sendEmail',
  })
  async sendContractStatusEmail(@Args('input') input: SendOfferStatusEmail) {
    const result = await this.sendContractOfferStatusEmailService.handle(
      input.recipientId as unknown as string,
      input.isLandLord,
    );
    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return SendContractOfferStatusEmailResponse.create(result.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => SendContractOfferEmailResponse, {
    name: 'contractOffer__sendEmail',
  })
  async sendRequestEmail(@IAM() iam: UserOrmEntity, @Args('input') input: SendOfferEmail) {
    const result = await this.sendContractOfferEmailService.handle(input.recipientId as unknown as string);
    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return SendContractOfferEmailResponse.create(result.unwrap());
  }
}
