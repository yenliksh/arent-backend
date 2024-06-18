import { PhoneValidator } from '@infrastructure/validators';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Validate } from 'class-validator';

@InputType()
export class ProfileEditGuarantorRequest {
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  readonly lastName: string;

  @Validate(PhoneValidator)
  @Field()
  readonly phone: string;
}
