import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteCardRequest } from '../commands/delete-card/delete-card.request.dto';
import { DeleteCardService } from '../commands/delete-card/delete-card.service';
import { SaveCardStartService } from '../commands/save-card-start/save-card-start.service';
import { InnopayCardResponse } from '../dtos/innopay-card.response.dto';
import { SaveCardStartResponse } from '../dtos/save-card-start.response.dto';

@Resolver()
export class InnopayCardMutationGraphqlResolver {
  constructor(
    private readonly saveCardStartService: SaveCardStartService,
    private readonly deleteCardService: DeleteCardService,
  ) {}

  @UseGuards(JwtAuthGuard())
  @Mutation(() => SaveCardStartResponse, {
    name: 'innopay_card__save',
  })
  async saveCardStart(@IAM() iam: UserOrmEntity) {
    return ProblemResponse.catchProblems(SaveCardStartResponse, async () => {
      const result = await this.saveCardStartService.handle(new UUID(iam.id));
      if (result.isErr()) {
        throw result.unwrapErr();
      }

      return SaveCardStartResponse.create({ ok: result.isOk(), url: result.unwrap() });
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => InnopayCardResponse, {
    name: 'innopay_card__delete',
  })
  async deleteCard(@IAM() iam: UserOrmEntity, @Args('input') input: DeleteCardRequest) {
    return ProblemResponse.catchProblems(InnopayCardResponse, async () => {
      const result = await this.deleteCardService.handle(new UUID(iam.id), input.cardId);

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      return InnopayCardResponse.create(result.unwrap());
    });
  }
}
