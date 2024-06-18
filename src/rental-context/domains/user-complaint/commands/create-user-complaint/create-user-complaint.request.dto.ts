import { UserComplaintType } from '@domains/user-complaint/domain/types';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateUserComplaintRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'recipientUserId' })
  readonly recipientUserId: string;

  @IsDefined()
  @Field(() => [UserComplaintType], {
    description: 'complaintType',
  })
  readonly cause: UserComplaintType[];

  @IsOptional()
  @Field(() => String, { nullable: true, description: 'reason' })
  readonly reason?: string;
}
