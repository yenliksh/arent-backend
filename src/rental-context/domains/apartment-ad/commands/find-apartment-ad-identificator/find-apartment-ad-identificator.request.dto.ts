import { Field, InputType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

@InputType()
export class FindApartmentAdIdentificatorRequest {
  @IsDefined()
  @Field(() => String, { description: 'id' })
  readonly id: string;
}
