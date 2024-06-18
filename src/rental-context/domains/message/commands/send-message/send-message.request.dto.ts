import { UrlValidator } from '@infrastructure/validators';
import { Field, Float, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsPositive, IsString, IsUUID, Length, Validate, ValidateIf } from 'class-validator';
import { MessageType } from 'src/rental-context/domains/message/domain/types';
import { SendMessageTypeValidator } from 'src/rental-context/domains/message/validators/send-message-type.validator';

@InputType()
export class SendMessageRequest {
  @IsDefined()
  @IsUUID()
  @Field(() => String)
  readonly id: string;

  @IsDefined()
  @IsUUID()
  @Field(() => String)
  readonly chatId: string;

  @IsDefined()
  @Validate(SendMessageTypeValidator)
  @Field(() => MessageType, {
    description:
      "Without SYSTEM (only TEXT or MEDIA) becourse Only the system can send system messages, so they're not here",
  })
  readonly type: MessageType;

  @ValidateIf((obj) => obj.type === MessageType.TEXT)
  @IsDefined()
  @Length(1, 2000)
  @Field(() => String, { nullable: true })
  readonly text?: string;

  @ValidateIf((obj) => obj.type === MessageType.MEDIA)
  @IsDefined()
  @Validate(UrlValidator)
  @Field(() => String, { nullable: true })
  readonly mediaUrl?: string;

  @ValidateIf((obj) => obj.type === MessageType.MEDIA)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  readonly mediaName?: string;

  @ValidateIf((obj) => obj.type === MessageType.MEDIA)
  @IsDefined()
  @IsPositive()
  @Field(() => Float, { nullable: true })
  readonly mediaWeight?: number;
  // Only the system can send system messages, so they're not here
}
