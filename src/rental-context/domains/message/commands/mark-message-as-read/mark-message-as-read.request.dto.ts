import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class MarkMessageAsReadRequest {
  @IsDefined()
  @IsUUID()
  @Field(() => String)
  readonly id: string;
}
