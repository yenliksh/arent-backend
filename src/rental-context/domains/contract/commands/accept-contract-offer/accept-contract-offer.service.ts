import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { ContractOfferAlreadyExistsProblem } from '@domains/contract/problems/contract-offer-already-exists.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { AcceptContractOfferRequest } from './accept-contract-offer.request.dto';

@Injectable()
export class AcceptContractOfferService {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractOfferQueue: ContractOfferQueue,
  ) {}

  async handle(
    dto: AcceptContractOfferRequest,
    userId: string,
  ): Promise<
    Result<
      UUID,
      IllegalOperationException | HttpException | ArgumentInvalidException | ContractOfferAlreadyExistsProblem
    >
  > {
    const { chatId, cardId } = dto;

    const contract = await this.contractRepository.findOneByTenantAndChatId(chatId, userId);

    if (!contract) {
      return Err(new NotFoundException('Contract not found'));
    }
    if (!contract.arrivalDate || !contract.departureDate) {
      return Err(new UnprocessableEntityException('Arrival and departure date required for accept contract'));
    }

    if (!contract.isReadyToAcceptInChat()) {
      return Err(new IllegalOperationException('You cannot accept this contract in chat'));
    }

    const apartmentAdId = contract.apartmentAdIdOrFail;

    const isApartmentFree = await this.contractRepository.checkApartmentIsFree({
      apartmentAdId: apartmentAdId.value,
      apartmentRentPeriodType: contract.apartmentRentPeriodType,
      from: contract.arrivalDate.value,
      to: contract.departureDate.value,
      selfContractId: contract.id.value,
    });

    if (!isApartmentFree) {
      return Err(new ContractOfferAlreadyExistsProblem());
    }

    contract.setPending();

    await this.contractRepository.save(contract);

    this.contractOfferQueue.addAcceptJob({
      chatId,
      tenantId: userId,
      cardId,
    });

    return Ok(contract.id);
  }
}
