import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Job } from 'bull';
import { TransactionJobPayload } from '../types';
export declare class PaymentTransactionCashInProcessor {
    private readonly innopayCashInService;
    private readonly paymentTransactionRepository;
    private readonly contractRepository;
    private readonly pubSubService;
    private readonly eventEmitter;
    private readonly unitOfWork;
    private commandBus;
    private readonly configService;
    constructor(innopayCashInService: InnopayCashInService, paymentTransactionRepository: PaymentTransactionRepository, contractRepository: ContractRepository, pubSubService: PubSubService, eventEmitter: EventEmitter2, unitOfWork: UnitOfWork, commandBus: CommandBus, configService: ConfigService);
    handle(job: Job<TransactionJobPayload>): Promise<void>;
    publishPaymentTransaction(paymentTransaction: PaymentTransactionEntity): Promise<void>;
    private publishContract;
}
