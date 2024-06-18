import { InnopayAppointmentCardType, InnopayCardType } from '@domains/innopay-card/domain/types';
import { InnopayUsersOrmEntity } from '@infrastructure/database/entities/innopay-users.orm-entity';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ProblemBase } from '@libs/ddd/interface-adapters/base-classes/problem.base';
import { ArgumentNotProvidedException } from '@libs/exceptions';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InnopayCardService } from '@third-parties/innopay-payment/src/services/innopay-card.service';
import { InnopayEndSaveCard } from '@third-parties/innopay-payment/src/types/innopay-payment.types';
import { Err, Ok, Result } from 'oxide.ts';
import { InnopayCardRepository } from 'src/rental-context/domain-repositories/innopay-card/innopay-card.repository';
import { InnopayCardEntity } from 'src/rental-context/domains/innopay-card/domain/entities/innopay-card.entity';
import { PanMaskedVO } from 'src/rental-context/domains/innopay-card/domain/value-objects/pan-masked.value-object';
import { UserAlreadyHasThisCardProblem } from 'src/rental-context/domains/innopay-card/problems/user-already-has-this-card.problem';

@Injectable()
export class SaveCardEndService {
  constructor(
    private readonly innopayCardService: InnopayCardService,
    private readonly innopayCardRepository: InnopayCardRepository,
  ) {}

  async handle({
    userId,
    cnpCardId,
    cnpUserId,
    customerReference,
  }: {
    userId?: string;
    cnpUserId?: number;
    cnpCardId: number;
    customerReference: string;
  }): Promise<Result<UUID, ProblemBase | Error>> {
    let innopayUser: InnopayUsersOrmEntity | undefined;

    if (userId) {
      innopayUser = await this.innopayCardRepository.findCreditingInnopayUser(userId);
    }

    if (cnpUserId) {
      innopayUser = await this.innopayCardRepository.findCreditingInnopayUserByCnpUserId(cnpUserId);
    }

    if (!innopayUser) {
      return Err(new UnprocessableEntityException());
    }

    let endSaveCardResponse: InnopayEndSaveCard;
    try {
      endSaveCardResponse = await this.innopayCardService.endSaveCard(
        cnpCardId,
        innopayUser.cnpUserId,
        customerReference,
      );
    } catch (error) {
      return Err(new InnopayServiceBadRequestProblem((error as Error).message));
    }

    try {
      const cardType =
        endSaveCardResponse.cardType in InnopayCardType ? (endSaveCardResponse.cardType as InnopayCardType) : undefined;

      if (!cardType) {
        return Err(new ArgumentNotProvidedException(`Card type ${endSaveCardResponse.cardType} not provided`));
      }

      const card = InnopayCardEntity.create({
        cnpCardId: endSaveCardResponse.cardId,
        panMasked: new PanMaskedVO(endSaveCardResponse.panMasked),
        cardHolder: endSaveCardResponse.cardHolder,
        cardType,
        appointmentType: InnopayAppointmentCardType.CREDITING,
        cnpUserId: innopayUser.cnpUserId,
        userId: new UUID(innopayUser.userId),
      });
      await this.innopayCardRepository.save(card);

      return Ok(card.id);
    } catch (error) {
      return Err(new UserAlreadyHasThisCardProblem());
    }
  }
}
