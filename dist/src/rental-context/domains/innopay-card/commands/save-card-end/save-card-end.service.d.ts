import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ProblemBase } from '@libs/ddd/interface-adapters/base-classes/problem.base';
import { InnopayCardService } from '@third-parties/innopay-payment/src/services/innopay-card.service';
import { Result } from 'oxide.ts';
import { InnopayCardRepository } from 'src/rental-context/domain-repositories/innopay-card/innopay-card.repository';
export declare class SaveCardEndService {
    private readonly innopayCardService;
    private readonly innopayCardRepository;
    constructor(innopayCardService: InnopayCardService, innopayCardRepository: InnopayCardRepository);
    handle({ userId, cnpCardId, cnpUserId, customerReference, }: {
        userId?: string;
        cnpUserId?: number;
        cnpCardId: number;
        customerReference: string;
    }): Promise<Result<UUID, ProblemBase | Error>>;
}
