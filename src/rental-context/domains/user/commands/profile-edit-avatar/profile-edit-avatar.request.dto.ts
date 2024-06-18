import { UrlValidator } from '@infrastructure/validators';
import { Field, InputType } from '@nestjs/graphql';
import { Validate } from 'class-validator';

@InputType()
export class ProfileEditAvatarRequest {
  @Validate(UrlValidator)
  @Field(() => String, { nullable: true })
  readonly avatar: string | null;
}
