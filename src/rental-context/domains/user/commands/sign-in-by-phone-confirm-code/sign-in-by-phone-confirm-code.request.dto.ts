import { PhoneValidator } from '@infrastructure/validators';
import { SmscodeValidator } from '@infrastructure/validators/smscode.validator';
import { Field, InputType } from '@nestjs/graphql';
import { Validate } from 'class-validator';

@InputType()
export class SignInByPhoneConfirmCodeRequest {
  @Validate(PhoneValidator)
  @Field()
  readonly phone: string;

  @Field()
  @Validate(SmscodeValidator)
  readonly smscode: string;
}
