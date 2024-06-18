import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { MessageOrmMapper } from '@domain-repositories/message/message.orm-mapper';
import { MessageRepository } from '@domain-repositories/message/message.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { CancellationPolicyVO } from '@domain-value-objects/cancellation-policy.value-object';
import { UpdateLastMessageCommand } from '@domains/chat/commands/update-last-message/update-last-message.command';
import { ChatEntity } from '@domains/chat/domain/entities/chat.entity';
import { UserChatRole } from '@domains/chat/domain/types';
import { ContractRequestEntity } from '@domains/contract-request/domain/entities/contract-request.entity';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { BaseContractApartmentAdDataVO } from '@domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object';
import { MessageEntity } from '@domains/message/domain/entities/message.entity';
import { MessageType, SystemMessageType } from '@domains/message/domain/types';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ContractStatus } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateContractAfterRequestCommand } from './create-contract-after-request.command';

@CommandHandler(CreateContractAfterRequestCommand)
export class CreateContractAfterRequestHandler implements ICommandHandler<CreateContractAfterRequestCommand> {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly chatRepository: ChatRepository,
    private readonly messageRepository: MessageRepository,
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly userRepository: UserRepository,
    private readonly pubSubService: PubSubService,
    private commandBus: CommandBus,
  ) {}

  public async execute(command: CreateContractAfterRequestCommand): Promise<[contractId: UUID, chatId: UUID]> {
    const { contractRequest, trxId } = command;

    const contract = await this.createContract(contractRequest, trxId);

    const chat = await this.createChat(contract, trxId);

    const tenantId = contract.tenantIdOrFail;

    const message = await this.sendSystemMessage({
      chatId: chat.id,
      tenantId,
      comment: contractRequest.comment,
      contract,
      trxId,
    });

    // TODO: change to event
    this.publishMessage(message, chat);

    return [contract.id, chat.id];
  }

  private async createContract(contractRequest: ContractRequestEntity, trxId?: TransactionId) {
    const {
      apartmentRentPeriodType,
      arrivalDate,
      departureDate,
      shortTermRentBookingType,
      shortTermRentPaymentType,
      guests,
      apartmentAdId,
      rentPeriodVersion,
      landlordId,
      tenantId,
    } = contractRequest.getRequiredDataForContract();

    const [apartmentAd, landlord] = await Promise.all([
      this.apartmentAdRepository.findOneById(apartmentAdId.value, trxId),
      this.userRepository.findOneById(landlordId.value, trxId),
    ]);

    if (!apartmentAd) {
      throw new ArgumentInvalidException('Apartment ad required');
    }
    if (!landlord) {
      throw new NotFoundException('Landlord not found');
    }
    if (!apartmentAd.baseApartmentAdDataForContract) {
      throw new NotFoundException('Apartment ad address not found');
    }

    if (shortTermRentBookingType && apartmentAd.rentBookingType !== shortTermRentBookingType.value) {
      throw new ArgumentInvalidException(
        `Rent booking type ${shortTermRentBookingType.value} not available for this apartment ad`,
      );
    }

    // TODO: rent payment type guard

    const contract = ContractEntity.create({
      apartmentRentPeriodType,
      contractRequestId: contractRequest.id,
      status: ContractStatus.CREATED,
      tenantId,
      detailsProps: {
        arrivalDate,
        departureDate,
        rules: apartmentAd?.rules,
      },
      apartmentAdId,
      landlordId,
      rentPeriodVersion,
      cancellationPolicyProps: CancellationPolicyVO.create(apartmentRentPeriodType, {
        shortTermCancellationPolicy: apartmentAd?.shortTermRentCancellationPolicy,
        longTermCancellationPolicy: apartmentAd?.longTermRentCancellationPolicy,
      }),
      costAndCurrency: apartmentAd.getCostAndCurrency(apartmentRentPeriodType),
      shortTermRentBookingType,
      shortTermRentPaymentType,
      baseContractApartmentAdData: new BaseContractApartmentAdDataVO({
        title: apartmentAd.baseApartmentAdDataForContract.name,
        address: apartmentAd.baseApartmentAdDataForContract.address,
      }),
      guests,
      isFined: !!landlord?.numberFines,
    });

    await this.contractRepository.save(contract, trxId);

    return contract;
  }

  private async createChat(contract: ContractEntity, trxId?: TransactionId) {
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

    return chat;
  }

  private async sendSystemMessage({
    chatId,
    tenantId,
    comment,
    contract,
    trxId,
  }: {
    chatId: UUID;
    tenantId: UUID;
    comment?: string;
    contract: ContractEntity;
    trxId?: TransactionId;
  }) {
    const message = MessageEntity.create({
      chatId,
      senderId: tenantId,
      type: MessageType.SYSTEM,
      system: {
        type: SystemMessageType.BOOKING_CREATED,
        contractData: { ...contract.systemMessageData, comment },
      },
    });

    await this.messageRepository.save(message, trxId);

    // TODO: change commandBus to event
    await this.commandBus.execute<UpdateLastMessageCommand>(new UpdateLastMessageCommand(chatId, trxId));

    return message;
  }

  private async publishMessage(message: MessageEntity, chat: ChatEntity) {
    const { members } = chat;

    const mapper = new MessageOrmMapper(MessageEntity);
    const ormMessage = await mapper.toOrmEntity(message);

    await this.pubSubService.publish(PubSubTrigger.NEW_MESSAGE, {
      message: ormMessage,
      chatMembers: members
        .map((member) => ({ [member.memberId.value]: member.role }))
        .reduce((acc, curr) => Object.assign({}, acc, curr)),
    });
  }
}
