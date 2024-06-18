import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class ContractTemporaryConcludeRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly chatId: string;
}
