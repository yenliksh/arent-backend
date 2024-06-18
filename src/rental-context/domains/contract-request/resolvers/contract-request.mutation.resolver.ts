import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AcceptRequest } from '../commands/accept-request/accept-request.request.dto';
import { AcceptRequestService } from '../commands/accept-request/accept-request.service';
import { RejectRequest } from '../commands/reject-request/reject-request.request.dto';
import { RejectRequestService } from '../commands/reject-request/reject-request.service';
import { SendRequestEmailResponse } from '../commands/send-request-email/send-request-email-response.dto';
import { SendRequestEmail } from '../commands/send-request-email/send-request-email.dto';
import { SendRequestEmailService } from '../commands/send-request-email/send-request-email.service';
import { SendBookingRequestStatusEmailResponse } from '../commands/send-request-status-email/send-request-status-email-response.dto';
import { SendRequestStatusEmail } from '../commands/send-request-status-email/send-request-status-email.dto';
import { SendBookingRequestStatusEmailService } from '../commands/send-request-status-email/send-request-status-email.service';
import { SendRequest } from '../commands/send-request/send-request.request.dto';
import { SendRequestService } from '../commands/send-request/send-request.service';
import { ContractRequestAcceptResponse } from '../dtos/contract-request-accept.response.dto';
import { ContractRequestResponse } from '../dtos/contract-request.response.dto';
import { FindContractRequestService } from '../queries/find-contract-request/find-contract-request.service';

@Resolver()
export class ContractRequestMutationGraphqlResolver {
  constructor(
    private readonly sendRequestService: SendRequestService,
    private readonly acceptRequestService: AcceptRequestService,
    private readonly rejectRequestService: RejectRequestService,
    private readonly findById: FindContractRequestService,
    private readonly bookingRequestSent: SendRequestEmailService,
    private readonly bookingRequestStatusSent: SendBookingRequestStatusEmailService,
  ) {}

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ContractRequestResponse, {
    name: 'contract_request__send',
  })
  async sendRequest(@IAM() iam: UserOrmEntity, @Args('input') input: SendRequest) {
    return ProblemResponse.catchProblems(ContractRequestResponse, async () => {
      const result = await this.sendRequestService.handle(new UUID(iam.id), input);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findById.handle(iam.id, { id: result.unwrap().value });

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ContractRequestResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ContractRequestAcceptResponse, {
    name: 'contract_request__accept',
  })
  async acceptRequest(@IAM() iam: UserOrmEntity, @Args('input') input: AcceptRequest) {
    return ProblemResponse.catchProblems(ContractRequestAcceptResponse, async () => {
      const result = await this.acceptRequestService.handle(new UUID(iam.id), input);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const [contractRequestId, chatId] = result.unwrap();

      const queryResult = await this.findById.handle(iam.id, { id: contractRequestId.value });

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ContractRequestAcceptResponse.create(queryResult.unwrap(), chatId.value);
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ContractRequestResponse, {
    name: 'contract_request__reject',
  })
  async rejectRequest(@IAM() iam: UserOrmEntity, @Args('input') input: RejectRequest) {
    return ProblemResponse.catchProblems(ContractRequestResponse, async () => {
      const result = await this.rejectRequestService.handle(new UUID(iam.id), input);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findById.handle(iam.id, { id: result.unwrap().value });

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return ContractRequestResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => SendRequestEmailResponse, {
    name: 'contract_request__sendEmail',
  })
  async sendRequestEmail(@IAM() iam: UserOrmEntity, @Args('input') input: SendRequestEmail) {
    const result = await this.bookingRequestSent.handle(input.recipientId as unknown as string);
    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return SendRequestEmailResponse.create(result.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => SendBookingRequestStatusEmailResponse, {
    name: 'contract_requestStatus__sendEmail',
  })
  async sendRequestStatusEmail(@IAM() iam: UserOrmEntity, @Args('input') input: SendRequestStatusEmail) {
    const result = await this.bookingRequestStatusSent.handle(input.recipientId as unknown as string);
    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return SendBookingRequestStatusEmailResponse.create(result.unwrap());
  }
}
