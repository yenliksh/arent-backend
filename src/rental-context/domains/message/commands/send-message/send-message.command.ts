import { CreateMessageProps } from 'src/rental-context/domains/message/domain/entities/message.entity';

export class SendMessageCommand {
  public constructor(public readonly props: CreateMessageProps) {}
}
