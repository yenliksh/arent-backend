import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class SendRequestStatusEmail {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly recipientId: string;
}
