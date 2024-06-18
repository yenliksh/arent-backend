import { DateISOValidator, EmailValidator } from '@infrastructure/validators';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, Validate } from 'class-validator';

@InputType()
export class SignUpByPhoneCreateUserRequest {
  @IsDefined()
  @IsString()
  @Field(() => String)
  readonly firstName: string;

  @IsDefined()
  @IsString()
  @Field(() => String)
  readonly lastName: string;

  @IsDefined()
  @Validate(EmailValidator)
  @Field(() => String)
  readonly email: string;

  @IsDefined()
  @Validate(DateISOValidator)
  @Field(() => String)
  readonly birthDate: string;
}
