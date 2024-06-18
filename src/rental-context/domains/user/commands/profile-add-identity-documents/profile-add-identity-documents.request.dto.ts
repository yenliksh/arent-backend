import { UrlValidator } from '@infrastructure/validators';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, Validate } from 'class-validator';

@InputType()
export class ProfileAddIdentityDocumentRequest {
  @IsDefined()
  @Validate(UrlValidator, { each: true })
  @Field(() => [String])
  readonly identityDocuments: string[];
}
