import { ContractRequestEntity } from '@domains/contract-request/domain/entities/contract-request.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
export declare class CreateContractAfterRequestCommand {
    readonly contractRequest: ContractRequestEntity;
    readonly trxId: TransactionId;
    constructor(contractRequest: ContractRequestEntity, trxId: TransactionId);
}
