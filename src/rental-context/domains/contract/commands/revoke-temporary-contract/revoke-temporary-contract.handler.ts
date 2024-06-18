import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRequestRepository } from '@domain-repositories/contract-request/contract-request.repository';
import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { MessageRepository } from '@domain-repositories/message/message.repository';
import { TemporaryPaymentTransactionRepository } from '@domain-repositories/temporary-payment-transaction/temporary-payment-transaction.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { UpdateLastMessageCommand } from '@domains/chat/commands/update-last-message/update-last-message.command';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { MessageEntity } from '@domains/message/domain/entities/message.entity';
import { MessageType, SystemMessageType } from '@domains/message/domain/types';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ShortTermRentBookingType } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RevokeTemporaryContractCommand } from './revoke-temporary-contract.command';

@CommandHandler(RevokeTemporaryContractCommand)
export class RevokeTemporaryContractHandler implements ICommandHandler<RevokeTemporaryContractCommand> {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractRequestRepository: ContractRequestRepository,
    private readonly messageRepository: MessageRepository,
    private readonly chatRepository: ChatRepository,
    private readonly temporaryPaymentTransactionRepository: TemporaryPaymentTransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly pubSubService: PubSubService,
    private readonly unitOfWork: UnitOfWork,
    private commandBus: CommandBus,
  ) {}

  public async execute(command: RevokeTemporaryContractCommand): Promise<void> {
    const { contractId } = command;

    const contract = await this.contractRepository.findOneById(contractId.value);

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    // temporary instant booking contract
    if (contract.shortTermRentBookingType === ShortTermRentBookingType.INSTANT) {
      return this.revokeInstantBookingContract(contract);
    }

    // temporary chat booking contract
    return this.revokeChatBookingContract(contract);
  }

  // TODO: test this
  private async revokeInstantBookingContract(contract: ContractEntity) {
    const trxId = await this.unitOfWork.start();
    try {
      const finingLandlord = async () => {
        if (contract.isFined) {
          const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value, trxId);

          if (!landlord) {
            throw new NotFoundException('Landlord not found');
          }

          landlord.fining();

          return landlord;
        }
      };

      const [landlord, contractRequest] = await Promise.all([
        finingLandlord(),
        this.contractRequestRepository.findOneByContractId(contract.id.value, trxId),
      ]);

      await Promise.all([
        this.contractRepository.delete(contract, trxId),
        contractRequest ? this.contractRequestRepository.delete(contractRequest, trxId) : undefined,
        landlord ? this.userRepository.save(landlord, trxId) : undefined,
      ]);

      await this.unitOfWork.commit(trxId);

      this.publishContract(contract, ContractPubSubEvent.DELETED);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      throw error;
    }
  }

  private async revokeChatBookingContract(contract: ContractEntity) {
    contract.rollbackChatBookingTemporary();

    const trxId = await this.unitOfWork.start();
    try {
      const finingLandlord = async () => {
        if (contract.isFined) {
          const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value, trxId);

          if (!landlord) {
            throw new NotFoundException('Landlord not found');
          }

          landlord.fining();

          return landlord;
        }
      };

      const [landlord, temporaryTransactions, chat] = await Promise.all([
        finingLandlord(),
        this.temporaryPaymentTransactionRepository.findByContractId(contract.id.value, trxId),
        this.chatRepository.findOneByContractId(contract.id.value, trxId),
      ]);

      if (!chat) {
        throw new NotFoundException('Chat not found');
      }

      await Promise.all([
        this.contractRepository.save(contract, trxId),
        temporaryTransactions.map((temporaryTransaction) =>
          this.temporaryPaymentTransactionRepository.delete(temporaryTransaction, trxId),
        ),
        this.sendSystemMessage({ chatId: chat.id, contract, tenantId: contract.tenantIdOrFail, trxId }),
        landlord ? this.userRepository.save(landlord, trxId) : undefined,
      ]);

      await this.unitOfWork.commit(trxId);

      this.publishContract(contract, ContractPubSubEvent.UPDATED);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      throw error;
    }
  }

  private async sendSystemMessage({
    chatId,
    tenantId,
    contract,
    trxId,
  }: {
    chatId: UUID;
    tenantId: UUID;
    contract: ContractEntity;
    trxId?: TransactionId;
  }) {
    const message = MessageEntity.create({
      chatId,
      senderId: tenantId,
      type: MessageType.SYSTEM,
      system: {
        type: SystemMessageType.TEMPORARY_BOOKING_REVOKE,
        contractData: contract.systemMessageData,
      },
    });

    await this.messageRepository.save(message, trxId);

    await this.commandBus.execute<UpdateLastMessageCommand>(new UpdateLastMessageCommand(chatId, trxId));

    return message;
  }

  private async publishContract(contract: ContractEntity, event: ContractPubSubEvent) {
    const mapper = new ContractOrmMapper(ContractEntity);
    const ormContract = await mapper.toOrmEntity(contract);

    this.pubSubService.publish(PubSubTrigger.UPDATE_CONTRACT, {
      contract: ormContract,
      event,
    });
  }
}
