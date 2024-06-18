import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InnopayCardService } from '@third-parties/innopay-payment/src/services/innopay-card.service';
import { Result } from 'oxide.ts';
import { InnopayCardRepository } from 'src/rental-context/domain-repositories/innopay-card/innopay-card.repository';
export declare class SaveCardStartService {
    private readonly innopayCardService;
    private readonly innopayCardRepository;
    private readonly configService;
    constructor(innopayCardService: InnopayCardService, innopayCardRepository: InnopayCardRepository, configService: ConfigService);
    handle(userId: UUID): Promise<Result<string, InnopayServiceBadRequestProblem | BadRequestException>>;
}
