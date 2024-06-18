import { UserModel } from '@domains/user/models/user.model';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { MessageStatus, MessageType, SystemMessageType } from '../domain/types';
import { SystemMessageDataModel } from './sub-models/system-message-data.model';
import { TransactionMetaModel } from './sub-models/transaction-meta.model';
export declare class MessageModel extends ModelBase {
    constructor(message: MessageOrmEntity);
    chatId: string;
    senderId?: string;
    type: MessageType;
    status: MessageStatus;
    text?: string;
    mediaUrl?: string;
    mediaName?: string;
    mediaWeight?: number;
    systemMessageType?: SystemMessageType;
    contractData?: SystemMessageDataModel;
    transactionsMeta: TransactionMetaModel[];
    sender?: UserModel;
    static create(props: MessageOrmEntity): MessageModel;
}
