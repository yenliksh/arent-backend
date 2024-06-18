import { UrlValidator } from '@infrastructure/validators';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID, Validate } from 'class-validator';

@InputType()
export class AddApartmentAdOwnershipDocumentRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsDefined()
  @Validate(UrlValidator, { each: true })
  @Field(() => [String])
  readonly ownershipDocuments: string[];
}
