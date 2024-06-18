import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { InnopayCardRepository } from '@domain-repositories/innopay-card/innopay-card.repository';
import { InnopayAppointmentCardType } from '@domains/innopay-card/domain/types';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { ChangeTenantPaymentMethodRequest } from './change-tenant-payment-method.request.dto';

@Injectable()
export class ChangeTenantPaymentMethodService {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly innopayCardRepository: InnopayCardRepository,
  ) {}

  async handle(
    dto: ChangeTenantPaymentMethodRequest,
    userId: string,
  ): Promise<Result<UUID, HttpException | ArgumentInvalidException>> {
    const { cardId: newCardId, contractId } = dto;

    const [contract, isCardExist] = await Promise.all([
      this.contractRepository.findOneById(contractId),
      this.innopayCardRepository.isCardExist({
        cardId: newCardId,
        userId,
        appointmentType: InnopayAppointmentCardType.CHARGE_OFF,
      }),
    ]);

    if (!contract) {
      return Err(new NotFoundException('Contract not found'));
    }
    if (contract.tenant?.value !== userId) {
      return Err(new ArgumentInvalidException('Change tenant payment method available for tenant only'));
    }
    if (!isCardExist) {
      return Err(new NotFoundException('Innopay card not found'));
    }

    const cardId = new UUID(newCardId);

    contract.setTenantPaymentMethod(cardId);

    await this.contractRepository.save(contract);

    return Ok(cardId);
  }
}
