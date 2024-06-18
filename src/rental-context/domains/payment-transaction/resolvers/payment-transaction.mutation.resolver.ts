import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Result } from 'oxide.ts';

import { TenantManuallyPayCommand } from '../commands/tenant-manually-pay/tenant-manually-pay.command';
import { TenantManuallyPayRequest } from '../commands/tenant-manually-pay/tenant-manually-pay.request.dto';
import { PaymentTransactionResponse } from '../dtos/payment-transaction.response.dto';
import { FindPaymentTransactionService } from '../queries/find-payment-transaction/find-payment-transaction.service';

@Resolver()
export class PaymentTransactionMutationGraphqlResolver {
  constructor(private commandBus: CommandBus, private readonly findByIdService: FindPaymentTransactionService) {}

  @UseGuards(JwtAuthGuard())
  @Mutation(() => PaymentTransactionResponse, { name: 'paymentTransaction__tenant_manuallyPay' })
  async withdrawMoneyFromTenant(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: TenantManuallyPayRequest,
  ): Promise<PaymentTransactionResponse> {
    return ProblemResponse.catchProblems(PaymentTransactionResponse, async () => {
      const result = await this.commandBus.execute<TenantManuallyPayCommand, Result<UUID, Error>>(
        new TenantManuallyPayCommand(new UUID(input.id), new UUID(iam.id)),
      );

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findByIdService.handle(result.unwrap(), new UUID(iam.id));

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return PaymentTransactionResponse.create(queryResult.unwrap());
    });
  }
}
