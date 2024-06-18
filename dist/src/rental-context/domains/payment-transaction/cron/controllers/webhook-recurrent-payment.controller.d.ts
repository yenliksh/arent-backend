import { CommandBus } from '@nestjs/cqrs';
export declare class WebhookRecurrentPaymentController {
    private commandBus;
    constructor(commandBus: CommandBus);
    transferMoneyToLandlord(): Promise<boolean>;
    withdrawalMoneyFromTenant(): Promise<boolean>;
}
