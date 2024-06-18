import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsString, IsUUID } from 'class-validator';

@InputType()
export class RejectRequest {
  @IsDefined()
  @IsUUID()
  @Field(() => String)
  readonly contractRequestId: string;

  @IsDefined()
  @IsString()
  @Field(() => String)
  readonly reason: string;
}
