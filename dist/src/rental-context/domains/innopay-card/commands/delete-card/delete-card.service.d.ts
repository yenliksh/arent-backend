import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { DeletingCardIsActiveProblem } from '@domains/innopay-card/problems/deleting-card-is-active.problem';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { UnprocessableEntityException } from '@nestjs/common';
import { InnopayCardService } from '@third-parties/innopay-payment/src/services/innopay-card.service';
import { Result } from 'oxide.ts';
import { InnopayCardRepository } from 'src/rental-context/domain-repositories/innopay-card/innopay-card.repository';
import { InnopayCardEntity } from 'src/rental-context/domains/innopay-card/domain/entities/innopay-card.entity';
export declare class DeleteCardService {
    private readonly innopayCardService;
    private readonly innopayCardRepository;
    private readonly apartmentAdRepository;
    private readonly contractRepository;
    constructor(innopayCardService: InnopayCardService, innopayCardRepository: InnopayCardRepository, apartmentAdRepository: ApartmentAdRepository, contractRepository: ContractRepository);
    handle(userId: UUID, cardId: string): Promise<Result<InnopayCardEntity, InnopayServiceBadRequestProblem | UnprocessableEntityException | ArgumentInvalidException | DeletingCardIsActiveProblem>>;
}
