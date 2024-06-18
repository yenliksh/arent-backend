import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRequestRepository } from '@domain-repositories/contract-request/contract-request.repository';
import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { MessageOrmMapper } from '@domain-repositories/message/message.orm-mapper';
import { PaymentTransactionOrmMapper } from '@domain-repositories/payment-transaction/payment-transaction.orm-mapper';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { TemporaryPaymentTransactionRepository } from '@domain-repositories/temporary-payment-transaction/temporary-payment-transaction.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { PauseApartmentAdByTypeCommand } from '@domains/apartment-ad/commands/pause-apartment-ad/pause-apartment-ad-by-type.command';
import { CreateChatCommand } from '@domains/chat/commands/create-chat/create-chat.command';
import { ChatEntity } from '@domains/chat/domain/entities/chat.entity';
import { RentalDateGuard } from '@domains/contract/base-classes/rental-guards/rental-date.guard';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { AddChargeOffCardCommand } from '@domains/innopay-card/commands/add-charge-off-card/add-charge-off-card.command';
import { PushSystemMessageCommand } from '@domains/message/commands/push-system-message/push-system-message.command';
import { MessageEntity } from '@domains/message/domain/entities/message.entity';
import { SystemMessageType } from '@domains/message/domain/types';
import { CompleteFirstCashInContractCommand } from '@domains/payment-transaction/commands/complete-first-cash-in-contract/complete-first-cash-in-contract.command';
import {
  PaymentTransactionEntity,
  PaymentTransactionMeta,
} from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { TemporaryPaymentTransactionEntity } from '@domains/temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity';
import { UserEntity } from '@domains/user/domain/entities/user.entity';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType, ShortTermRentBookingType } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { DateUtil } from '@libs/utils/date-util';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent, PaymentTransactionPubSubEvent } from '@modules/graphql-subscriptions/types';
import { ContractConcludedEvent } from '@modules/notifications/services/contract-concluded/contract-concluded.event';
import { NotFoundException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';

import { RejectIntersectedContractsCommand } from '../reject-intersected-contracts/reject-intersected-contracts.command';
import { UpdateContractPaymentTransactionCommand } from '../update-contract-payment-transaction/update-contract-payment-transaction.command';
import { ModifyContractToPermanentCommand } from './modify-contract-to-permanent.command';

@CommandHandler(ModifyContractToPermanentCommand)
export class ModifyContractToPermanentHandler implements ICommandHandler<ModifyContractToPermanentCommand> {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractRequestRepository: ContractRequestRepository,
    private readonly temporaryPaymentTransactionRepository: TemporaryPaymentTransactionRepository,
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
    private readonly pubSubService: PubSubService,
    private commandBus: CommandBus,
    private readonly unitOfWork: UnitOfWork,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(command: ModifyContractToPermanentCommand) {
    const { contractId } = command;
    const { cnpCardId, cnpUserId } = command.cardProps;

    const [contract, temporaryPaymentTransactions] = await Promise.all([
      this.contractRepository.findOneById(contractId.value),
      this.temporaryPaymentTransactionRepository.findByContractId(contractId.value),
    ]);

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    const customerReference = contract.paymentDataOrFail.customerReference;

    let paymentTransactions: PaymentTransactionEntity[] | undefined;
    let transactionsMeta: PaymentTransactionMeta[] = [];
    let firstPaymentTransactionId: UUID | undefined;

    // modify contract
    const trxId = await this.unitOfWork.start();
    try {
      const cardResult = await this.commandBus.execute<AddChargeOffCardCommand, Result<UUID, Error>>(
        new AddChargeOffCardCommand(
          { userId: contract.tenantIdOrFail, customerReference, cnpCardId, cnpUserId },
          trxId,
        ),
      );

      if (cardResult.isErr()) {
        throw cardResult.unwrapErr();
      }

      contract.modifyToPermanent(cardResult.unwrap());

      paymentTransactions = this.createPaymentTransactionByTemporary(temporaryPaymentTransactions, contract);

      transactionsMeta = paymentTransactions?.map((t) => t.metaInfo);

      const createChatForInstantBooking = async () => {
        if (contract.shortTermRentBookingType === ShortTermRentBookingType.INSTANT) {
          await this.commandBus.execute<CreateChatCommand>(
            new CreateChatCommand(
              { contractId, transactionsMeta, systemMessageType: SystemMessageType.INSTANT_BOOKING },
              trxId,
            ),
          );
        }
      };

      const temporaryTransactions = await this.temporaryPaymentTransactionRepository.findByContractId(
        contract.id.value,
        trxId,
      );

      await Promise.all([
        this.contractRepository.save(contract, trxId),
        temporaryTransactions.map((temporaryTransaction) =>
          this.temporaryPaymentTransactionRepository.delete(temporaryTransaction, trxId),
        ),
        paymentTransactions.map((paymentTransaction) =>
          this.paymentTransactionRepository.save(paymentTransaction, trxId),
        ),
        createChatForInstantBooking(),
      ]);

      await this.unitOfWork.commit(trxId);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      throw error;
    }

    try {
      const payRes = await this.commandBus.execute<CompleteFirstCashInContractCommand, Result<UUID, Error>>(
        new CompleteFirstCashInContractCommand(contractId, customerReference),
      );

      if (payRes.isErr()) {
        throw payRes.unwrapErr();
      }

      firstPaymentTransactionId = payRes.unwrap();
    } catch (error) {
      if (contract.shortTermRentBookingType === ShortTermRentBookingType.INSTANT) {
        await this.permanentInstantContractDown(contract);
        throw error;
      }

      await this.permanentRequestContractDown(contract);
      throw error;
    }

    await Promise.all([
      this.publishContract(contract, ContractPubSubEvent.UPDATED),
      paymentTransactions.map((paymentTransaction) => this.publishPaymentTransaction(paymentTransaction)),
    ]);

    this.commandBus.execute<RejectIntersectedContractsCommand>(new RejectIntersectedContractsCommand(contractId));
    this.commandBus.execute<UpdateContractPaymentTransactionCommand>(
      new UpdateContractPaymentTransactionCommand(contractId),
    );
    if (contract.shortTermRentBookingType !== ShortTermRentBookingType.INSTANT) {
      this.sendSystemMessage(contract, { paymentTransactionId: firstPaymentTransactionId, transactionsMeta });
    }
    if (contract.apartmentRentPeriodType === ApartmentRentPeriodType.LONG_TERM) {
      this.commandBus.execute<PauseApartmentAdByTypeCommand>(
        new PauseApartmentAdByTypeCommand(contract.apartmentAdIdOrFail.value, contract.apartmentRentPeriodType),
      );
    }
  }

  private createPaymentTransactionByTemporary(
    temporaryTransactions: TemporaryPaymentTransactionEntity[],
    contract: ContractEntity,
  ): PaymentTransactionEntity[] {
    const rentalDateGuard = new RentalDateGuard(contract.rentPeriodVersion, contract.status.value);

    const rentPeriodStrategyType = rentalDateGuard.defineRentPeriodStrategyType(
      {
        arrivalDate: contract.arrivalDateOrFail,
        departureDate: contract.departureDateOrFail,
      },
      contract.apartmentRentPeriodType,
    );

    return temporaryTransactions
      .sort((a, b) => (DateUtil.parseUTC(a.withdrawFundsDate).isAfter(b.withdrawFundsDate) ? 1 : -1))
      .map((temporaryTransaction, index) => {
        const props = temporaryTransaction.getPropsCopy();

        return PaymentTransactionEntity.create({
          contractId: props.contractId,
          cost: props.cost,
          endDate: props.endDate,
          recipientTaxRate: props.recipientTaxRate,
          rentDays: props.rentDays,
          senderTaxRate: props.senderTaxRate,
          startDate: props.startDate,
          taxAmount: props.taxAmount,
          totalAmountPayable: props.totalAmountPayable,
          totalAmountToBeTransferred: props.totalAmountToBeTransferred,
          totalRevenue: props.totalRevenue,
          withdrawFundsDate: props.withdrawFundsDate,
          isLastPayment: index === temporaryTransactions.length - 1,
          isRecurring: !!index && temporaryTransactions.length > 1,
          recipientId: contract.landlordIdOrFail,
          rentPeriodStrategyType,
          senderId: contract.tenantIdOrFail,
        });
      });
  }

  private async sendSystemMessage(
    contract: ContractEntity,
    paymentTransactionProps: { transactionsMeta: PaymentTransactionMeta[]; paymentTransactionId: UUID },
  ) {
    const { paymentTransactionId, transactionsMeta } = paymentTransactionProps;

    const chat = await this.chatRepository.findByContractIdAndMemberId(
      contract.id.value,
      contract.tenantIdOrFail.value,
    );

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const message = await this.commandBus.execute<PushSystemMessageCommand, Result<MessageEntity, Error>>(
      new PushSystemMessageCommand({
        chatId: chat.id,
        senderId: contract.tenantIdOrFail,
        content: {
          type: SystemMessageType.BOOKING_CONCLUDED,
          contractData: { ...contract.systemMessageData, transactionsMeta },
        },
      }),
    );

    if (message.isErr()) {
      throw message.unwrapErr();
    }

    this.publishMessage(message.unwrap(), chat);

    if (contract.landlord && contract.tenant) {
      this.eventEmitter.emit(
        ContractConcludedEvent.eventName,
        ContractConcludedEvent.create({
          contractId: contract.id,
          paymentTransactionId,
          chatId: chat.id,
          landlordId: contract.landlord,
          tenantId: contract.tenant,
        }),
      );
    }
  }

  private async publishContract(contract: ContractEntity, event: ContractPubSubEvent) {
    const mapper = new ContractOrmMapper(ContractEntity);
    const ormContract = await mapper.toOrmEntity(contract);

    this.pubSubService.publish(PubSubTrigger.UPDATE_CONTRACT, {
      contract: ormContract,
      event,
    });
  }

  private async publishMessage(message: MessageEntity, chat: ChatEntity) {
    const { members } = chat;

    const mapper = new MessageOrmMapper(MessageEntity);
    const ormMessage = await mapper.toOrmEntity(message);

    await this.pubSubService.publish(PubSubTrigger.NEW_MESSAGE, {
      message: ormMessage,
      chatMembers: members
        .map((member) => ({ [member.memberId.value]: member.role }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    });
  }

  private async publishPaymentTransaction(paymentTransaction: PaymentTransactionEntity) {
    const mapper = new PaymentTransactionOrmMapper(PaymentTransactionEntity);
    const ormPaymentTransaction = await mapper.toOrmEntity(paymentTransaction);

    this.pubSubService.publish(PubSubTrigger.UPDATE_PAYMENT_TRANSACTION, {
      paymentTransaction: ormPaymentTransaction,
      cardOwnerId: paymentTransaction.senderId.value,
      event: PaymentTransactionPubSubEvent.UPDATED,
    });
  }

  private async permanentInstantContractDown(contract: ContractEntity) {
    await Promise.all([
      this.paymentTransactionRepository.deleteByContractId(contract.id.value),
      this.contractRepository.delete(contract),
      this.contractRequestRepository.findOneByContractId(contract.id.value),
    ]);

    this.publishContract(contract, ContractPubSubEvent.DELETED);
  }

  private async permanentRequestContractDown(contract: ContractEntity) {
    contract.acceptOfferDown();

    let landlord: UserEntity | undefined;

    if (contract.isFined) {
      landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value);

      if (!landlord) {
        throw new NotFoundException('Landlord not found');
      }

      landlord.fining();
    }

    await Promise.all([
      this.contractRepository.save(contract),
      this.paymentTransactionRepository.deleteByContractId(contract.id.value),
      landlord ? this.userRepository.save(landlord) : undefined,
    ]);

    this.publishContract(contract, ContractPubSubEvent.UPDATED);
  }
}
