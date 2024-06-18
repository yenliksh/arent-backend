import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class CreateApartmentAdIdentificatorRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'uid' })
  readonly apartmentId: string;

  @IsDefined()
  @Field(() => String, { description: 'titleSeo' })
  readonly titleSeo: string;
}
