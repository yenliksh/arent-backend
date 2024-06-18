import { UrlValidator } from '@infrastructure/validators';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID, Validate } from 'class-validator';

@InputType()
export class EditApartmentAdMediaRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsDefined()
  @Validate(UrlValidator, { each: true })
  @Field(() => [String])
  readonly photos: string[];
}
