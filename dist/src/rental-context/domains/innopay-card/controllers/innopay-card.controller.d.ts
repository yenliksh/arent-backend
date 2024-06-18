import { ConfigService } from '@nestjs/config';
import { SaveCardEndService } from '../commands/save-card-end/save-card-end.service';
export declare class InnopayCardController {
    private readonly saveCardEndService;
    private readonly configService;
    constructor(saveCardEndService: SaveCardEndService, configService: ConfigService);
    refreshToken({ cardId, userId, customerReference }: {
        cardId: number;
        userId: number;
        customerReference: string;
    }): Promise<any>;
}
