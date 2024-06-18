import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { CashInFailedEvent } from '@domains/payment-transaction/domain/events/events';
import { CommandBus } from '@nestjs/cqrs';
export declare class PaymentTransactionListener {
    private readonly contractRepository;
    private commandBus;
    constructor(contractRepository: ContractRepository, commandBus: CommandBus);
    cashInFailed(payload: CashInFailedEvent): Promise<void>;
}
