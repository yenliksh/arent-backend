import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class FindApartmentAdsIdentificatorsRequest {
  @IsDefined()
  @Field(() => [String], { description: 'id' })
  readonly ids: string[];
}
