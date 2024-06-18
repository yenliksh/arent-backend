import { CreateMessageProps } from 'src/rental-context/domains/message/domain/entities/message.entity';
export declare class SendMessageCommand {
    readonly props: CreateMessageProps;
    constructor(props: CreateMessageProps);
}
