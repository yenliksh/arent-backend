import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ChatRepository } from '@domain-repositories/chat/chat.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { InnopayCardRepository } from '@domain-repositories/innopay-card/innopay-card.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { UpdateContractPaymentTransactionCommand } from '@domains/contract/commands/update-contract-payment-transaction/update-contract-payment-transaction.command';
import { InnopayAppointmentCardType } from '@domains/innopay-card/domain/types';
import { PushSystemMessageCommand } from '@domains/message/commands/push-system-message/push-system-message.command';
import { MessageEntity } from '@domains/message/domain/entities/message.entity';
import { SystemMessageType } from '@domains/message/domain/types';
import { SystemFirstContractPayCommand } from '@domains/payment-transaction/commands/system-first-contract-pay/system-first-contract-pay.command';
import { PaymentTransactionMeta } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { ContractConcludedEvent } from '@modules/notifications/services/contract-concluded/contract-concluded.event';
import { Process, Processor } from '@nestjs/bull';
import { ConflictException, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as Sentry from '@sentry/node';
import { Job } from 'bull';
import { Result } from 'oxide.ts';

import { ContractOfferPubSubService } from '../services/contract-offer-pub-sub.service';
import { AcceptContractOfferJobPayload, ContractBulls, ContractExceptions, ContractOfferProcess } from '../types';

@Processor(ContractBulls.CONTRACT_OFFER_QUEUE)
export class AcceptContractOfferProcessor {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly chatRepository: ChatRepository,
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly innopayCardRepository: InnopayCardRepository,
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
    private readonly contractOfferPubSubService: ContractOfferPubSubService,
    private readonly unitOfWork: UnitOfWork,
    private commandBus: CommandBus,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Process(ContractOfferProcess.ACCEPT)
  async handle(job: Job<AcceptContractOfferJobPayload>) {
    const { chatId, tenantId, cardId } = job.data;

    const contract = await this.contractRepository.findOneByTenantAndChatId(chatId, tenantId);

    if (!contract) {
      throw new NotFoundException(ContractExceptions.CONTRACT_NOT_FOUND);
    }
    if (!contract.isPending) {
      throw new ArgumentInvalidException(ContractExceptions.CONTRACT_NOT_PENDING);
    }
    if (!contract.arrivalDate || !contract.departureDate) {
      throw new UnprocessableEntityException(ContractExceptions.ARRIVAL_AND_DEPARTURE_DATES_REQUIRED);
    }

    const isCardExist = await this.innopayCardRepository.isCardExist({
      cardId,
      userId: tenantId,
      appointmentType: InnopayAppointmentCardType.CHARGE_OFF,
    });

    if (!isCardExist) {
      throw new NotFoundException(ContractExceptions.INNOPAY_CARD_NOT_FOUND);
    }

    const apartmentAdId = contract.apartmentAdIdOrFail;

    const isApartmentFree = await this.contractRepository.checkApartmentIsFree({
      apartmentAdId: apartmentAdId.value,
      apartmentRentPeriodType: contract.apartmentRentPeriodType,
      selfContractId: contract.id.value,
      from: contract.arrivalDate?.value,
      to: contract.departureDate?.value,
    });

    if (!isApartmentFree) {
      throw new ConflictException(ContractExceptions.APARTMENT_IS_NOT_FREE);
    }

    let transactionsMeta: PaymentTransactionMeta[] = [];
    let paymentTransactionId: UUID;

    const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value);

    if (!landlord) {
      throw new NotFoundException('Landlord not found');
    }

    // step 1: accept contract, create transactions and pay
    const transactions = contract.acceptOffer(new UUID(cardId));
    contract.endPending();
    landlord.resetFine(); // TODO: check fine in contract

    const trxId = await this.unitOfWork.start();
    try {
      await Promise.all([this.contractRepository.save(contract, trxId), this.userRepository.save(landlord, trxId)]);
      await Promise.all(transactions.map((transaction) => this.paymentTransactionRepository.save(transaction, trxId)));

      await this.unitOfWork.commit(trxId);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
    }

    try {
      const { id, customerReference } = await this.payContractOrFail(contract.id);
      paymentTransactionId = id;

      const attachedCardId = cardId || contract.tenantPaymentCardOrFail;
      const paymentCard = await this.innopayCardRepository.findOneById(attachedCardId);

      transactionsMeta = transactions.map((t) => {
        if (t.id.equals(paymentTransactionId)) {
          if (paymentCard) {
            t.cashInSuccess(paymentCard.cardMeta, { customerReference });
          }
          return t.metaInfo;
        }

        return t.metaInfo;
      });

      this.contractOfferPubSubService.publishContract(contract, ContractPubSubEvent.UPDATED);
      this.commandBus.execute<UpdateContractPaymentTransactionCommand>(
        new UpdateContractPaymentTransactionCommand(contract.id),
      );
    } catch (error) {
      contract.acceptOfferDown();

      await this.contractRepository.save(contract);

      await this.paymentTransactionRepository.deleteByContractId(contract.id.value);

      this.contractOfferPubSubService.publishContract(
        contract,
        ContractPubSubEvent.UPDATED,
        (error as Error).message as ContractExceptions,
      );

      throw error;
    }

    // step 2: reject intersected contracts (do nothing if exception)
    try {
      // TODO: (refactoring) make listener for events to decline another's intersected contract asynchronously
      await this.cancellationIntersectedContractsByDates({
        apartmentAdId,
        apartmentRentPeriodType: contract.apartmentRentPeriodType,
        arrivalDate: contract.arrivalDate?.getDate(),
        departureDate: contract.departureDate?.getDate(),
      });
    } catch (error) {
      Logger.log(error);
      Sentry.captureException(error);
    }

    // step 3: pause publishing apartment ad (do nothing if exception)
    try {
      await this.pausePublishingApartmentAd(apartmentAdId.value, contract.apartmentRentPeriodType);
    } catch (error) {
      Logger.log(error);
      Sentry.captureException(error);
    }

    // step 4: send system message (do nothing if exception)
    try {
      const chat = await this.findChatByContract(contract.id.value, tenantId);

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

      this.contractOfferPubSubService.publishMessage(message.unwrap(), chat);

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
    } catch (error) {
      Logger.log(error);
      Sentry.captureException(error);
    }
  }

  private async payContractOrFail(contractId: UUID) {
    const payResult = await this.commandBus.execute<
      SystemFirstContractPayCommand,
      Result<{ id: UUID; customerReference: string }, Error | InnopayServiceBadRequestProblem>
    >(new SystemFirstContractPayCommand(contractId));

    if (payResult.isErr()) {
      throw payResult.unwrapErr();
    }

    const paymentTransactionId = payResult.unwrap();

    return paymentTransactionId;
  }

  private async findChatByContract(contractId: string, tenantId: string) {
    const chat = await this.chatRepository.findByContractIdAndMemberId(contractId, tenantId);

    if (!chat) {
      throw new NotFoundException(ContractExceptions.CHAT_NOT_FOUND);
    }
    if (!chat.members?.length) {
      throw new ArgumentInvalidException(ContractExceptions.CHAT_MEMBER_REQUIRED);
    }

    return chat;
  }

  private async cancellationIntersectedContractsByDates(props: {
    apartmentAdId: UUID;
    apartmentRentPeriodType: ApartmentRentPeriodType;
    arrivalDate?: Date;
    departureDate?: Date;
  }) {
    const contracts = await this.contractRepository.findManyForReject({
      apartmentAdId: props.apartmentAdId.value,
      apartmentRentPeriodType: props.apartmentRentPeriodType,
      from: props.arrivalDate?.toISOString(),
      to: props.departureDate?.toISOString(),
    });

    await Promise.all(
      contracts.map((contract) => {
        contract.reject();
        return this.contractRepository.save(contract);
      }),
    );
  }

  private async pausePublishingApartmentAd(apartmentAdId: string, rentPeriodType: ApartmentRentPeriodType) {
    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);

    if (!apartmentAd) {
      throw new NotFoundException(ContractExceptions.APARTMENT_AD_NOT_FOUND);
    }

    apartmentAd?.pausePublishingByAcceptContract(rentPeriodType);

    // for long term rent remove document from publication
    if (rentPeriodType === ApartmentRentPeriodType.LONG_TERM && apartmentAd.longTermRentId) {
      await this.longTermRentDocumentRepository.delete(apartmentAd);
    }

    // for short term rent update rented dates in search filters
    if (apartmentAd.isShortTermRent && apartmentAd.isShortTermRentPublished) {
      await this.shortTermRentDocumentRepository.update(apartmentAd);
    }

    await this.apartmentAdRepository.save(apartmentAd);
  }
}
