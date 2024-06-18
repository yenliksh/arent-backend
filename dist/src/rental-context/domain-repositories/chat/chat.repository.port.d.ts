import { ChatEntity, ChatProps } from '@domains/chat/domain/entities/chat.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
export interface ChatRepositoryPort extends RepositoryPort<ChatEntity, ChatProps> {
    findByIdAndMemberId(id: string, memberId: string, trxId?: TransactionId): Promise<ChatEntity | undefined>;
    findOneByContractId(contractId: string, trxId?: TransactionId): Promise<ChatEntity | undefined>;
    findByContractIdAndMemberId(contractId: string, memberId: string, trxId?: TransactionId): Promise<ChatEntity | undefined>;
    findOneByMessageAndMemberId(messageId: string, memberId: string, trxId?: TransactionId): Promise<ChatEntity | undefined>;
}
