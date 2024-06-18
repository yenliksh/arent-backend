import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType, createUnionType } from '@nestjs/graphql';

import { InnopayCardEntity } from '../domain/entities/innopay-card.entity';
import { DeletingCardIsActiveProblem } from '../problems/deleting-card-is-active.problem';

export const InnopayBadRequestAndDeletingCardIsActiveProblem = createUnionType({
  name: 'InnopayBadRequestAndDeletingCardIsActiveProblem',
  types: () => [InnopayServiceBadRequestProblem, DeletingCardIsActiveProblem],
});

@ObjectType()
export class InnopayCardResponse extends OkResponse implements ProblemResponse {
  constructor(innopay: InnopayCardEntity) {
    super({ ok: !!innopay?.id.value });
  }

  @Field(() => InnopayBadRequestAndDeletingCardIsActiveProblem, { nullable: true })
  problem?: InnopayServiceBadRequestProblem | DeletingCardIsActiveProblem;

  static create(prop: InnopayCardEntity) {
    const payload = new InnopayCardResponse(prop);

    return payload;
  }
}
