import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { DeletingCardIsActiveProblem } from '@domains/innopay-card/problems/deleting-card-is-active.problem';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InnopayCardService } from '@third-parties/innopay-payment/src/services/innopay-card.service';
import { Err, Ok, Result } from 'oxide.ts';
import { InnopayCardRepository } from 'src/rental-context/domain-repositories/innopay-card/innopay-card.repository';
import { InnopayCardEntity } from 'src/rental-context/domains/innopay-card/domain/entities/innopay-card.entity';

@Injectable()
export class DeleteCardService {
  constructor(
    private readonly innopayCardService: InnopayCardService,
    private readonly innopayCardRepository: InnopayCardRepository,
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly contractRepository: ContractRepository,
  ) {}

  async handle(
    userId: UUID,
    cardId: string,
  ): Promise<
    Result<
      InnopayCardEntity,
      | InnopayServiceBadRequestProblem
      | UnprocessableEntityException
      | ArgumentInvalidException
      | DeletingCardIsActiveProblem
    >
  > {
    const innopayCards = await this.innopayCardRepository.findManyByUserId(userId.value);

    const deletingCard = innopayCards.find((card) => card.id.value === cardId);
    if (!deletingCard) {
      return Err(new ArgumentInvalidException(`User does not have card with id=${cardId}`));
    }

    const isUsed = await Promise.all([
      this.apartmentAdRepository.findOne({ paymentMethod: { innopayCardId: cardId } }),
      this.contractRepository.findOneActiveByCardId(cardId),
    ]).then((res) => res.some((res) => res !== undefined));

    if (isUsed) {
      return Err(new DeletingCardIsActiveProblem());
    }

    try {
      await this.innopayCardService.deleteCard(deletingCard.cnpCardId, deletingCard.cnpUserId);
    } catch (error) {
      return Err(new InnopayServiceBadRequestProblem((error as Error).message));
    }

    const res = await this.innopayCardRepository.delete(deletingCard);
    return Ok(res);
  }
}
