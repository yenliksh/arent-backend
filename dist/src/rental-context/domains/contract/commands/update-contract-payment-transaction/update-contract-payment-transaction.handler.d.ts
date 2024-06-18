import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateContractPaymentTransactionCommand } from './update-contract-payment-transaction.command';
export declare class UpdateContractPaymentTransactionHandler implements ICommandHandler<UpdateContractPaymentTransactionCommand> {
    private readonly contractRepository;
    private readonly paymentTransactionRepository;
    private readonly pubSubService;
    private readonly unitOfWork;
    constructor(contractRepository: ContractRepository, paymentTransactionRepository: PaymentTransactionRepository, pubSubService: PubSubService, unitOfWork: UnitOfWork);
    execute(command: UpdateContractPaymentTransactionCommand): Promise<void>;
    private publishContract;
}
