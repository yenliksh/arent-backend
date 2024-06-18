import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ApartmentAdRejectedEvent } from '@modules/notifications/services/apartment-ad-rejected/apartment-ad-rejected.event';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';

import { RejectAdLongTermRentCommand } from './reject-ad-long-rent.command';

@CommandHandler(RejectAdLongTermRentCommand)
export class RejectAdLongTermRentHandler implements ICommandHandler<RejectAdLongTermRentCommand> {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(command: RejectAdLongTermRentCommand): Promise<Result<UUID, HttpException>> {
    const { apartmentAdId, declineReason } = command;

    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    apartmentAd.rejectLongTermRent(declineReason);

    const result = await this.apartmentAdRepository.save(apartmentAd);

    this.eventEmitter.emit(
      ApartmentAdRejectedEvent.eventName,
      ApartmentAdRejectedEvent.create({ recipientId: apartmentAd.landlordId }),
    );

    return Ok(result);
  }
}
