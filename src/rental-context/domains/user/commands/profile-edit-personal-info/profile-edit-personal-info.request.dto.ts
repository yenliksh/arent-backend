import { GenderType } from '@domains/user/domain/types';
import { DateISOValidator } from '@infrastructure/validators';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';

@InputType()
export class ProfileEditPersonalInfoRequest {
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  readonly firstName?: string;

  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  readonly lastName?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  readonly middleName?: string;

  @IsEnum(GenderType)
  @Field(() => GenderType, { nullable: true })
  readonly gender?: GenderType;

  @IsDefined()
  @Validate(DateISOValidator)
  @Field({ nullable: true })
  readonly birthdate?: string;
}
