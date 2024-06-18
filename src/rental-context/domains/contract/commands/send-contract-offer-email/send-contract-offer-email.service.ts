import { ContractOfferSentEvent } from '@modules/notifications/services/contract-offer-sent/contract-offer-sent.event';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';

@Injectable()
export class SendContractOfferEmailService {
  constructor(private readonly userRepository: UserRepository, private eventEmitter: EventEmitter2) {}

  async handle(userId: string): Promise<Result<string, NotFoundException>> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    this.eventEmitter.emit(
      ContractOfferSentEvent.eventName,
      ContractOfferSentEvent.create({
        recipientId: user.id,
      }),
    );

    return Ok('Email was sent successfully');
  }
}
