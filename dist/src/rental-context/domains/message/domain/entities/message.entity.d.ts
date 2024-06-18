import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { MessageStatus, MessageType } from '../types';
import { MediaMessageProps, MediaMessageVO } from '../value-objects/media-message.value-object';
import { SystemMessageProps, SystemMessageVO } from '../value-objects/system-message.value-object';
import { TextMessageProps, TextMessageVO } from '../value-objects/text-message.value-object';
export interface CreateMessageProps {
    id?: UUID;
    chatId: UUID;
    senderId: UUID;
    type: MessageType;
    text?: TextMessageProps;
    media?: MediaMessageProps;
    system?: SystemMessageProps;
}
export declare type MessageProps = Omit<CreateMessageProps, 'id' | 'text' | 'media' | 'system'> & {
    status: MessageStatus;
    text?: TextMessageVO;
    media?: MediaMessageVO;
    system?: SystemMessageVO;
};
export declare class MessageEntity extends AggregateRoot<MessageProps> {
    protected readonly _id: UUID;
    static create({ id, chatId, senderId, type, text, media, system }: CreateMessageProps): MessageEntity;
    get id(): UUID;
    validate(): void;
}
