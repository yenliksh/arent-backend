import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class ProfileConfirmVerificationEmailRequest {
  @IsDefined()
  @Field(() => String)
  readonly token: string;
}
