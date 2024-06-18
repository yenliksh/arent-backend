import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ContractRequestPaginationResponse } from '../dtos/contract-request-pagination.response';
import { FindContractRequestForLandlordRequest } from '../queries/find-contract-request-for-landlord/find-contract-request-for-landlord.request.dto';
import { FindContractRequestForLandlordService } from '../queries/find-contract-request-for-landlord/find-contract-request-for-landlord.service';

@Resolver()
export class ContractRequestQueryGraphqlResolver {
  constructor(private readonly findForLandlordService: FindContractRequestForLandlordService) {}

  @UseGuards(JwtAuthGuard())
  @Query(() => ContractRequestPaginationResponse, { name: 'contractRequest__forLandlord' })
  async findForLandlord(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: FindContractRequestForLandlordRequest,
  ): Promise<ContractRequestPaginationResponse> {
    const result = await this.findForLandlordService.handle(iam.id, input);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ContractRequestPaginationResponse.create(result.unwrap());
  }
}
