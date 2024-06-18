import { InnopayCardRepository } from '@domain-repositories/innopay-card/innopay-card.repository';
import { InnopayCardEntity } from '@domains/innopay-card/domain/entities/innopay-card.entity';
import { InnopayAppointmentCardType, InnopayCardType } from '@domains/innopay-card/domain/types';
import { PanMaskedVO } from '@domains/innopay-card/domain/value-objects/pan-masked.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentNotProvidedException } from '@libs/exceptions';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as Sentry from '@sentry/node';
import { InnopayCardService } from '@third-parties/innopay-payment/src/services/innopay-card.service';
import { Err, Ok, Result } from 'oxide.ts';

import { AddChargeOffCardCommand } from './add-charge-off-card.command';

@CommandHandler(AddChargeOffCardCommand)
export class AddChargeOffCardHandler implements ICommandHandler<AddChargeOffCardCommand> {
  constructor(
    private readonly innopayCardService: InnopayCardService,
    private readonly innopayCardRepository: InnopayCardRepository,
  ) {}

  public async execute(command: AddChargeOffCardCommand): Promise<Result<UUID, ArgumentNotProvidedException>> {
    const { trxId } = command;
    const { cnpCardId, cnpUserId, customerReference, userId } = command.props;

    const cardInfo = await this.innopayCardService.getCardInfo(cnpCardId, cnpUserId, customerReference);

    const cardType = cardInfo.cardType in InnopayCardType ? (cardInfo.cardType as InnopayCardType) : undefined;

    if (!cardType) {
      Sentry.captureException('Card type not in InnopayCardType enum');
      return Err(new ArgumentNotProvidedException('Card type not in InnopayCardType enum'));
    }

    const innopayCard = InnopayCardEntity.create({
      appointmentType: InnopayAppointmentCardType.CHARGE_OFF,
      cardHolder: cardInfo.cardHolder,
      cardType,
      cnpCardId,
      cnpUserId,
      panMasked: new PanMaskedVO(cardInfo.panMasked),
      userId,
    });

    await this.innopayCardRepository.save(innopayCard, trxId);

    return Ok(innopayCard.id);
  }
}
