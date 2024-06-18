import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';

import { MessageHasEmptyFieldsError } from '../errors/message.errors';
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

export type MessageProps = Omit<CreateMessageProps, 'id' | 'text' | 'media' | 'system'> & {
  status: MessageStatus;
  text?: TextMessageVO;
  media?: MediaMessageVO;
  system?: SystemMessageVO;
};

export class MessageEntity extends AggregateRoot<MessageProps> {
  protected readonly _id: UUID;

  static create({ id, chatId, senderId, type, text, media, system }: CreateMessageProps): MessageEntity {
    if (!id) {
      id = UUID.generate();
    }
    const props: MessageProps = {
      status: MessageStatus.SENT,
      chatId,
      senderId,
      type,
      text: text ? TextMessageVO.create(text) : undefined,
      media: media ? MediaMessageVO.create(media) : undefined,
      system: system ? SystemMessageVO.create(system) : undefined,
    };

    const message = new MessageEntity({ id: id ?? UUID.generate(), props });

    return message;
  }

  public get id() {
    return this._id;
  }

  validate(): void {
    const { chatId, senderId, type, text, media, system } = this.props;

    const fields = [chatId, type, senderId];

    if (fields.some((f) => f == null)) {
      throw new MessageHasEmptyFieldsError('All required fields must be filled in the message');
    }
    if (type === MessageType.TEXT && (!text || media || system)) {
      throw new ArgumentInvalidException('Text message should has text only');
    }
    if (type === MessageType.MEDIA && (text || !media || system)) {
      throw new ArgumentInvalidException('Media message should has media only');
    }
    if (type === MessageType.SYSTEM && (text || media || !system)) {
      throw new ArgumentInvalidException('System message should has system only');
    }
  }
}
