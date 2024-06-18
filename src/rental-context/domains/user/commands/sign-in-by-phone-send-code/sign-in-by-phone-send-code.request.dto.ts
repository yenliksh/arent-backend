import { PhoneValidator } from '@infrastructure/validators';
import { Field, InputType } from '@nestjs/graphql';
import { Validate } from 'class-validator';

@InputType()
export class SignInByPhoneSendCodeRequest {
  @Validate(PhoneValidator)
  @Field()
  readonly phone: string;
}
