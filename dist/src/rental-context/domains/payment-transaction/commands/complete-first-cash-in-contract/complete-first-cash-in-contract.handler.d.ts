import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ICommandHandler } from '@nestjs/cqrs';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Result } from 'oxide.ts';
import { CompleteFirstCashInContractCommand } from './complete-first-cash-in-contract.command';
export declare class CompleteFirstCashInContractHandler implements ICommandHandler<CompleteFirstCashInContractCommand> {
    private readonly paymentTransactionRepository;
    private readonly innopayCashInService;
    private readonly unitOfWork;
    constructor(paymentTransactionRepository: PaymentTransactionRepository, innopayCashInService: InnopayCashInService, unitOfWork: UnitOfWork);
    execute(command: CompleteFirstCashInContractCommand): Promise<Result<UUID, Error | InnopayServiceBadRequestProblem>>;
}
