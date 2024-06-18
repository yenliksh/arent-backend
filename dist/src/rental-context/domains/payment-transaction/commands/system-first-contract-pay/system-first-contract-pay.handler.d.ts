import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Result } from 'oxide.ts';
import { SystemFirstContractPayCommand } from './system-first-contract-pay.command';
export declare class SystemFirstContractPayHandler implements ICommandHandler<SystemFirstContractPayCommand> {
    private readonly paymentTransactionRepository;
    private readonly innopayCashInService;
    private readonly unitOfWork;
    private commandBus;
    constructor(paymentTransactionRepository: PaymentTransactionRepository, innopayCashInService: InnopayCashInService, unitOfWork: UnitOfWork, commandBus: CommandBus);
    execute(command: SystemFirstContractPayCommand): Promise<Result<{
        id: UUID;
        customerReference: string;
    }, Error | InnopayServiceBadRequestProblem>>;
}
