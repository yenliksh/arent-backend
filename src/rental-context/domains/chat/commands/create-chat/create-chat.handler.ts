import { ContractRequestRepository } from '@domain-repositories/contract-request/contract-request.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ChatEntity } from '@domains/chat/domain/entities/chat.entity';
import { UserChatRole } from '@domains/chat/domain/types';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { MessageEntity } from '@domains/message/domain/entities/message.entity';
import { MessageType, SystemMessageType } from '@domains/message/domain/types';
import { PaymentTransactionMeta } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { ChatRepository } from 'src/rental-context/domain-repositories/chat/chat.repository';
import { MessageRepository } from 'src/rental-context/domain-repositories/message/message.repository';

import { CreateChatCommand } from './create-chat.command';

@CommandHandler(CreateChatCommand)
export class CreateChatHandler implements ICommandHandler<CreateChatCommand> {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractRequestRepository: ContractRequestRepository,
    private readonly messageRepository: MessageRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  public async execute(command: CreateChatCommand): Promise<Result<UUID, NotFoundException>> {
    const { trxId } = command;
    const { contractId, systemMessageType, transactionsMeta } = command.props;

    const [contract, contractRequest] = await Promise.all([
      this.contractRepository.findOneById(contractId.value, trxId),
      this.contractRequestRepository.findOneByContractId(contractId.value, trxId),
    ]);

    if (!contract) {
      return Err(new NotFoundException('Contract not found'));
    }

    const tenantId = contract.tenantIdOrFail;
    const landlordId = contract.landlordIdOrFail;

    const chat = ChatEntity.create({
      contractId: contract.id,
      members: [
        {
          memberId: landlordId,
          role: UserChatRole.LANDLORD,
        },
        {
          memberId: tenantId,
          role: UserChatRole.TENANT,
        },
      ],
    });

    await this.chatRepository.save(chat, trxId);

    const lastMessage = await this.sendSystemMessage(
      {
        chatId: chat.id,
        contract,
        comment: contractRequest?.comment,
        systemMessageType,
        transactionsMeta,
      },
      trxId,
    );

    chat.setLastMessageId(lastMessage?.id);

    // add chat -> add message -> join message to chat
    // Promise([add chat, add message]) -> wrong. Because message has chatId and if chat not created yet, postgres send error (invalid foreign key)
    // Promise([add message, join message to chat]) -> wrong. Because if message not added to database and we try set message id to chats table in database, postgres send error (invalid foreign key)
    // move this code to async processed promise -> wrong (i think). Because this does in outer transaction
    await this.chatRepository.save(chat, trxId);

    return Ok(chat.id);
  }

  private async sendSystemMessage(
    {
      chatId,
      comment,
      contract,
      systemMessageType,
      transactionsMeta,
    }: {
      systemMessageType: SystemMessageType;
      chatId: UUID;
      comment?: string;
      contract: ContractEntity;
      transactionsMeta: PaymentTransactionMeta[];
    },
    trxId?: TransactionId,
  ) {
    const message = MessageEntity.create({
      chatId,
      senderId: contract.tenantIdOrFail,
      type: MessageType.SYSTEM,
      system: {
        type: systemMessageType,
        contractData: { ...contract.systemMessageData, comment, transactionsMeta },
      },
    });

    await this.messageRepository.save(message, trxId);

    return message;
  }
}
