import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { CompleteCashOutInnopayTransactionProducer } from '@domains/innopay-transaction/bulls/sqs-producers/complete-cash-out-innopay-transaction.producer';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InnopayCashOutService } from '@third-parties/innopay-payment/src/services/innopay-cash-out.service';
import { Job } from 'bull';
import { TransactionJobPayload } from '../types';
export declare class PaymentTransactionCashOutProcessor {
    private readonly innopayCashOutService;
    private readonly paymentTransactionRepository;
    private readonly contractRepository;
    private readonly completeCashOutInnopayTransactionProducer;
    private readonly unitOfWork;
    private readonly configService;
    private readonly eventEmitter;
    private readonly pubSubService;
    private isProduction;
    constructor(innopayCashOutService: InnopayCashOutService, paymentTransactionRepository: PaymentTransactionRepository, contractRepository: ContractRepository, completeCashOutInnopayTransactionProducer: CompleteCashOutInnopayTransactionProducer, unitOfWork: UnitOfWork, configService: ConfigService, eventEmitter: EventEmitter2, pubSubService: PubSubService);
    handle(job: Job<TransactionJobPayload>): Promise<void>;
    private startCashOut;
    private endCashOut;
    publishPaymentTransaction(paymentTransaction: PaymentTransactionEntity): Promise<void>;
    private publishContract;
}
