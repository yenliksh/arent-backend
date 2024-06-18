import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { InnopayCardModel } from 'src/rental-context/domains/innopay-card/models/innopay-card.model';
import { UserAlreadyHasThisCardProblem } from 'src/rental-context/domains/innopay-card/problems/user-already-has-this-card.problem';

export const InnopayBadRequestAndUserHasCardProblem = createUnionType({
  name: 'InnopayBadRequestAndUserHasCardProblem',
  types: () => [InnopayServiceBadRequestProblem, UserAlreadyHasThisCardProblem],
});

@ObjectType()
export class SaveCardEndResponse implements ProblemResponse {
  @Field(() => InnopayCardModel, { nullable: true })
  card?: InnopayCardModel;

  @Field(() => InnopayBadRequestAndUserHasCardProblem, { nullable: true })
  problem?: InnopayServiceBadRequestProblem | UserAlreadyHasThisCardProblem;

  static create(prop: InnopayCardOrmEntity) {
    const payload = new SaveCardEndResponse();

    payload.card = InnopayCardModel.create(prop);

    return payload;
  }
}
