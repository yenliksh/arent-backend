import { EmailValidator } from '@infrastructure/validators';
import { Field, InputType } from '@nestjs/graphql';
import { Validate } from 'class-validator';

@InputType()
export class ProfileEditEmailRequest {
  @Validate(EmailValidator)
  @Field()
  readonly email: string;
}
