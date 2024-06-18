import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { BaseOkProps, OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';

type SaveCardStartResponseProps = BaseOkProps & { url?: string };

@ObjectType()
export class SaveCardStartResponse extends OkResponse implements ProblemResponse {
  constructor(props: SaveCardStartResponseProps) {
    super(props);
  }

  @Field(() => InnopayServiceBadRequestProblem, { nullable: true })
  problem?: InnopayServiceBadRequestProblem;

  @Field(() => String, { nullable: true })
  url?: string;

  static create(prop: SaveCardStartResponseProps) {
    const payload = new SaveCardStartResponse(prop);

    payload.url = prop.url;

    return payload;
  }
}
