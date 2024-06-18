import { ContractOfferStatusChangedEvent } from '@modules/notifications/services/contract-offer-status-changed/contract-offer-status-changed.event';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';

@Injectable()
export class SendContractOfferStatusEmailService {
  constructor(private readonly userRepository: UserRepository, private eventEmitter: EventEmitter2) {}

  async handle(userId: string, isLandLord?: boolean): Promise<Result<string, NotFoundException>> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    this.eventEmitter.emit(
      ContractOfferStatusChangedEvent.eventName,
      ContractOfferStatusChangedEvent.create({
        recipientId: user.id,
        isLandLord,
      }),
    );

    return Ok('Email was sent successfully');
  }
}
