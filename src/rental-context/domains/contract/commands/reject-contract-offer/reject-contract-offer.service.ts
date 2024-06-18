import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { RejectTrigger } from '@domains/contract/bulls/types';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { RejectContractOfferRequest } from './reject-contract-offer.request.dto';

@Injectable()
export class RejectContractOfferService {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractOfferQueue: ContractOfferQueue,
  ) {}

  async handle(dto: RejectContractOfferRequest, userId: string): Promise<Result<UUID, NotFoundException>> {
    const { chatId } = dto;

    const contract = await this.contractRepository.findOneByMemberAndChatId(chatId, userId);

    if (!contract) {
      return Err(new NotFoundException());
    }

    contract.setPending();

    await this.contractRepository.save(contract);

    this.contractOfferQueue.addRejectJob({
      chatId,
      userId,
      rejectTrigger: RejectTrigger.USER,
    });

    return Ok(contract.id);
  }
}
