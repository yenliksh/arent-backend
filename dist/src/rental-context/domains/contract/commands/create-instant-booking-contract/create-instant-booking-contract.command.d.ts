import { ContractRequestEntity } from '@domains/contract-request/domain/entities/contract-request.entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class CreateInstantContractCommand {
    readonly contractRequest: ContractRequestEntity;
    readonly cardId: UUID;
    readonly trxId?: string | undefined;
    constructor(contractRequest: ContractRequestEntity, cardId: UUID, trxId?: string | undefined);
}
