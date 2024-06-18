import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { TemporaryPaymentTransactionRepository } from '@domain-repositories/temporary-payment-transaction/temporary-payment-transaction.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { CheckAccessInnopayGuidProducer } from '@domains/innopay-transaction/bulls/sqs-producers/check-access-innopay-guid.producer';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ConfigService } from '@nestjs/config';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Job } from 'bull';
import { ContractOfferPubSubService } from '../services/contract-offer-pub-sub.service';
import { TemporaryInstantBookingJobPayload } from '../types';
export declare class InstantTemporaryBookingProcessor {
    private readonly contractRepository;
    private readonly temporaryPaymentTransactionRepository;
    private readonly userRepository;
    private readonly contractOfferPubSubService;
    private readonly innopayCashInService;
    private readonly checkAccessInnopayGuidProducer;
    private readonly configService;
    private readonly unitOfWork;
    constructor(contractRepository: ContractRepository, temporaryPaymentTransactionRepository: TemporaryPaymentTransactionRepository, userRepository: UserRepository, contractOfferPubSubService: ContractOfferPubSubService, innopayCashInService: InnopayCashInService, checkAccessInnopayGuidProducer: CheckAccessInnopayGuidProducer, configService: ConfigService, unitOfWork: UnitOfWork);
    handle(job: Job<TemporaryInstantBookingJobPayload>): Promise<void>;
    private checkIsApartmentFree;
    private resetFineFromLandlord;
    private startCashInTransaction;
}
