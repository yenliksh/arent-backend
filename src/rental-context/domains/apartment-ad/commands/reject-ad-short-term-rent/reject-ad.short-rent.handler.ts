import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ApartmentAdRejectedEvent } from '@modules/notifications/services/apartment-ad-rejected/apartment-ad-rejected.event';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';

import { RejectAdShortTermRentCommand } from './reject-ad-short-rent.command';

@CommandHandler(RejectAdShortTermRentCommand)
export class RejectAdShortTermRentHandler implements ICommandHandler<RejectAdShortTermRentCommand> {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(command: RejectAdShortTermRentCommand): Promise<Result<UUID, HttpException>> {
    const { apartmentAdId, declineReason } = command;

    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    apartmentAd.rejectShortTermRent(declineReason);

    const result = await this.apartmentAdRepository.save(apartmentAd);

    this.eventEmitter.emit(
      ApartmentAdRejectedEvent.eventName,
      ApartmentAdRejectedEvent.create({ recipientId: apartmentAd.landlordId }),
    );

    return Ok(result);
  }
}
