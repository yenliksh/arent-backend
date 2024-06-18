import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { InnopayCardRepository } from '@domain-repositories/innopay-card/innopay-card.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { ChangeTenantPaymentMethodRequest } from './change-tenant-payment-method.request.dto';
export declare class ChangeTenantPaymentMethodService {
    private readonly contractRepository;
    private readonly innopayCardRepository;
    constructor(contractRepository: ContractRepository, innopayCardRepository: InnopayCardRepository);
    handle(dto: ChangeTenantPaymentMethodRequest, userId: string): Promise<Result<UUID, HttpException | ArgumentInvalidException>>;
}
