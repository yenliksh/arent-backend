import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsString, IsUUID } from 'class-validator';

@InputType()
export class EditApartmentAdDescriptionRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsDefined()
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsDefined()
  @IsString()
  @Field(() => String)
  readonly description: string;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly remoteView: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly selfCheckIn: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly freeParking: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly workSpace: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly quite: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly forFamily: boolean;
}
