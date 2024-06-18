import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class FindContractRequestRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'contract request' })
  readonly id: string;
}
