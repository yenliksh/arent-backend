import { BaseOkProps, OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { SendSmsCodeRestrictionProblem } from 'src/rental-context/domains/user/problems/send-sms-code-rescriction.problem';

type SendCodeResponseProps = BaseOkProps & { smscode?: string | null };

@ObjectType()
export class SignInByPhoneSendCodeResponse extends OkResponse implements ProblemResponse {
  constructor(props: SendCodeResponseProps) {
    super(props);
  }

  @Field(() => String, { nullable: true })
  smscode: string | null;

  @Field(() => SendSmsCodeRestrictionProblem, { nullable: true })
  problem?: SendSmsCodeRestrictionProblem;

  static create(props: SendCodeResponseProps) {
    const payload = new SignInByPhoneSendCodeResponse(props);

    payload.smscode = props?.smscode || null;

    return payload;
  }
}
