import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class AcceptRequest {
  @IsDefined()
  @IsUUID()
  @Field(() => String)
  readonly contractRequestId: string;
}
