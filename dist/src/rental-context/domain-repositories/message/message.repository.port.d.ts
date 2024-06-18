import { MessageEntity, MessageProps } from '@domains/message/domain/entities/message.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
export interface MessageRepositoryPort extends RepositoryPort<MessageEntity, MessageProps> {
    findLastForChat(chatId: string, trxId?: TransactionId): Promise<MessageEntity | undefined>;
    findLastOfArray(messageIds: string[], trxId?: TransactionId): Promise<MessageEntity | undefined>;
    findLastOfferForChat(chatId: string, trxId?: TransactionId): Promise<MessageEntity | undefined>;
}
