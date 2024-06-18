import { ConfigService } from '@nestjs/config';
import { InnopayTransactionRestApiWebhookService } from './innopay-transaction.webhook.service';
export declare class InnopayTransactionRestApiWebhookController {
    private readonly innopayTransactionRestApiWebhookService;
    private readonly configService;
    constructor(innopayTransactionRestApiWebhookService: InnopayTransactionRestApiWebhookService, configService: ConfigService);
    modifyToPermanent({ cardId, userId, customerReference }: {
        cardId: string;
        userId: string;
        customerReference: string;
    }): Promise<any>;
}
