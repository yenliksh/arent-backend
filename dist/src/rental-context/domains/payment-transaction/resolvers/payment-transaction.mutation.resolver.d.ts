import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { CommandBus } from '@nestjs/cqrs';
import { TenantManuallyPayRequest } from '../commands/tenant-manually-pay/tenant-manually-pay.request.dto';
import { PaymentTransactionResponse } from '../dtos/payment-transaction.response.dto';
import { FindPaymentTransactionService } from '../queries/find-payment-transaction/find-payment-transaction.service';
export declare class PaymentTransactionMutationGraphqlResolver {
    private commandBus;
    private readonly findByIdService;
    constructor(commandBus: CommandBus, findByIdService: FindPaymentTransactionService);
    withdrawMoneyFromTenant(iam: UserOrmEntity, input: TenantManuallyPayRequest): Promise<PaymentTransactionResponse>;
}
