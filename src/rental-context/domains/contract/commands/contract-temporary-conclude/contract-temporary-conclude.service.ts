import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { ContractOfferQueue } from '@domains/contract/bulls/queue/contract-offer.queue';
import { ContractOfferAlreadyExistsProblem } from '@domains/contract/problems/contract-offer-already-exists.problem';
import { ContractStatus } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { ContractTemporaryConcludeRequest } from './contract-temporary-conclude.request';

@Injectable()
export class ContractTemporaryConcludeService {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractOfferQueue: ContractOfferQueue,
    private readonly pubSubService: PubSubService,
  ) {}

  async handle(
    dto: ContractTemporaryConcludeRequest,
    userId: string,
  ): Promise<Result<UUID, HttpException | ContractOfferAlreadyExistsProblem>> {
    const { chatId } = dto;

    const contract = await this.contractRepository.findOneByTenantAndChatId(chatId, userId);

    if (!contract) {
      return Err(new NotFoundException('Contract not found'));
    }
    if (!contract.arrivalDate || !contract.departureDate) {
      return Err(new UnprocessableEntityException('Arrival and departure date required for accept contract'));
    }

    if (contract.paymentData) {
      this.publishInnopayPageUrl(userId, contract.paymentData.paymentUrl, contract.paymentData.paymentUrlStartAt, {
        contractId: contract.id.value,
      });
      return Ok(contract.id);
    }

    if (contract.status.value === ContractStatus.CONCLUDED) {
      return Err(new UnprocessableEntityException('Contract already concluded'));
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

    this.contractOfferQueue.addTemporaryConcludeJob({
      chatId,
      tenantId: userId,
    });

    return Ok(contract.id);
  }

  private publishInnopayPageUrl(tenantId: string, url: string, startUrlDate: string, refs: { contractId: string }) {
    this.pubSubService.publish(PubSubTrigger.INNOPAY_PAGE_URL, {
      payingId: tenantId,
      url,
      startUrlDate: new Date(startUrlDate),
      ...refs,
    });
  }
}
