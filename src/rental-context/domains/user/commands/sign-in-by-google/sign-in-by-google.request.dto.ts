import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignInByGoogleRequest {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly accessToken: string;
}
