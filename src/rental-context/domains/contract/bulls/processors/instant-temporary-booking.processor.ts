import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { TemporaryPaymentTransactionRepository } from '@domain-repositories/temporary-payment-transaction/temporary-payment-transaction.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { CheckAccessInnopayGuidProducer } from '@domains/innopay-transaction/bulls/sqs-producers/check-access-innopay-guid.producer';
import { TemporaryPaymentTransactionEntity } from '@domains/temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { Process, Processor } from '@nestjs/bull';
import { ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Job } from 'bull';

import { ContractOfferPubSubService } from '../services/contract-offer-pub-sub.service';
import { ContractBulls, ContractExceptions, ContractOfferProcess, TemporaryInstantBookingJobPayload } from '../types';

@Processor(ContractBulls.CONTRACT_OFFER_QUEUE)
export class InstantTemporaryBookingProcessor {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly temporaryPaymentTransactionRepository: TemporaryPaymentTransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly contractOfferPubSubService: ContractOfferPubSubService,
    private readonly innopayCashInService: InnopayCashInService,
    private readonly checkAccessInnopayGuidProducer: CheckAccessInnopayGuidProducer,
    private readonly configService: ConfigService,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  @Process(ContractOfferProcess.INSTANT_TEMPORARY_BOOKING)
  async handle(job: Job<TemporaryInstantBookingJobPayload>) {
    const { contractId } = job.data;

    let contract: ContractEntity | undefined;
    let redirectURL: string | undefined;
    let startTransactionTime: string | undefined;

    const trxId = await this.unitOfWork.start();
    try {
      contract = await this.contractRepository.findOneById(contractId, trxId);

      if (!contract) {
        throw new NotFoundException(ContractExceptions.CONTRACT_NOT_FOUND);
      }
      if (!contract.isPending) {
        throw new ArgumentInvalidException(ContractExceptions.CONTRACT_NOT_PENDING);
      }
      if (!contract.arrivalDate || !contract.departureDate) {
        throw new UnprocessableEntityException(ContractExceptions.ARRIVAL_AND_DEPARTURE_DATES_REQUIRED);
      }

      // step 1: update contract
      await this.checkIsApartmentFree(
        {
          apartmentAdId: contract.apartmentAdIdOrFail.value,
          apartmentRentPeriodType: contract.apartmentRentPeriodType,
          selfContractId: contract.id,
          arrivalDate: contract.arrivalDate,
          departureDate: contract.departureDate,
        },
        trxId,
      );

      contract.endPending();

      const landlord = await this.resetFineFromLandlord(contract, trxId);

      const temporaryPaymentTransactions = contract.temporaryInstantBooking();

      // step 2: pay
      const firstTransaction = temporaryPaymentTransactions.find((transaction) => transaction.isFirst);
      if (!firstTransaction) {
        throw new UnprocessableEntityException('First temporary payment transaction not found');
      }

      const cashInResult = await this.startCashInTransaction(firstTransaction);

      const customerReference = cashInResult.customerReference;
      redirectURL = cashInResult.redirectURL;
      startTransactionTime = cashInResult.startTransactionTime;

      contract.setPaymentData({
        customerReference,
        paymentUrl: redirectURL,
        paymentUrlStartAt: new Date(startTransactionTime),
      });

      await Promise.all([
        this.contractRepository.save(contract, trxId),
        temporaryPaymentTransactions.map((transaction) =>
          this.temporaryPaymentTransactionRepository.save(transaction, trxId),
        ),
        landlord ? this.userRepository.save(landlord, trxId) : undefined,
      ]);

      // commit done after redirect url because in start cash in method there is not withdrawal
      await this.unitOfWork.commit(trxId);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      Sentry.captureException(error);

      const contract = await this.contractRepository.findOneById(contractId);

      if (contract) {
        contract.endPending();
        await this.contractRepository.save(contract);

        this.contractOfferPubSubService.publishContract(
          contract,
          ContractPubSubEvent.UPDATED,
          (error as Error).message as ContractExceptions,
        );
      }

      throw error;
    }

    this.contractOfferPubSubService.publishInnopayPageUrl(
      contract.tenantIdOrFail.value,
      redirectURL,
      startTransactionTime,
      {
        contractId: contract.id.value,
      },
    );
    this.contractOfferPubSubService.publishContract(contract, ContractPubSubEvent.UPDATED);
  }

  private async checkIsApartmentFree(
    props: {
      apartmentAdId: string;
      apartmentRentPeriodType: ApartmentRentPeriodType;
      selfContractId: UUID;
      arrivalDate: DateTimeISOTZVO;
      departureDate: DateTimeISOTZVO;
    },
    trxId?: TransactionId,
  ) {
    const { apartmentAdId, apartmentRentPeriodType, arrivalDate, departureDate, selfContractId } = props;

    const isApartmentFree = await this.contractRepository.checkApartmentIsFree({
      apartmentAdId,
      apartmentRentPeriodType,
      selfContractId: selfContractId.value,
      from: arrivalDate.value,
      to: departureDate.value,
      trxId,
    });

    if (!isApartmentFree) {
      throw new ConflictException(ContractExceptions.APARTMENT_IS_NOT_FREE);
    }
  }

  private async resetFineFromLandlord(contract: ContractEntity, trxId: TransactionId) {
    if (!contract.isFined) {
      return;
    }

    const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value, trxId);

    if (!landlord) {
      throw new NotFoundException(ContractExceptions.LANDLORD_NOT_FOUND);
    }

    landlord.resetFine();

    return landlord;
  }

  private async startCashInTransaction(
    temporaryTransaction: TemporaryPaymentTransactionEntity,
  ): Promise<{ redirectURL: string; startTransactionTime: string; customerReference: string }> {
    const returnURL = slashAgnostic(
      this.configService.get('backendUrl') as string,
      '/v1/contract/modify-to-permanent?customerReference=', // TODO: webhook
    );

    const { customerReference, redirectURL } = await this.innopayCashInService.startCashInFromNewCard({
      returnURL,
      totalAmount: temporaryTransaction.totalAmountPayable,
    });
    const startTransactionTime = DateUtil.utcNow().toISOString();

    await this.checkAccessInnopayGuidProducer.send({ customerReference, iteration: 0 });

    return { redirectURL, startTransactionTime, customerReference };
  }
}
