import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { InnopayCardModel } from '../models/innopay-card.model';
import { FindMyCardsRequest } from '../queries/find-my-cards/find-my-cards.request';
import { FindMyCardsService } from '../queries/find-my-cards/find-my-cards.service';
import { TenantContractCardRequest } from '../queries/tenant-contract-card/tenant-contract-card.request';
import { TenantContractCardService } from '../queries/tenant-contract-card/tenant-contract-card.service';

@Resolver()
export class InnopayCardQueryGraphqlResolver {
  constructor(
    private readonly findMyCardsService: FindMyCardsService,
    private readonly tenantContractCardService: TenantContractCardService,
  ) {}

  @UseGuards(JwtAuthGuard())
  @Query(() => [InnopayCardModel], { name: 'innopay__my_cards' })
  async getMyCards(
    @IAM() iam: UserOrmEntity,
    @Args('input', { nullable: true }) input?: FindMyCardsRequest,
  ): Promise<InnopayCardModel[]> {
    const result = await this.findMyCardsService.handle(iam.id, input);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return result.unwrap().map((card) => InnopayCardModel.create(card));
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => InnopayCardModel, { name: 'innopay__tenant_contractCard' })
  async tenantContractCard(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: TenantContractCardRequest,
  ): Promise<InnopayCardModel> {
    const result = await this.tenantContractCardService.handle(input, userId);

    return InnopayCardModel.create(result);
  }
}
