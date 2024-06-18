import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { CancellationTrigger } from '@domains/contract/domain/types';
import { DateISOVO } from '@libs/ddd/domain/value-objects/iso-date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { CancelConcludedContractCommand } from '../cancel-concluded-contract/cancel-concluded-contract.command';
import { CancelContractByTenantRequest } from './cancel-contract-by-tenant.request.dto';

// Orchestrator service of contract cancellation by tenant
@Injectable()
export class CancelContractByTenantService {
  constructor(private readonly contractRepository: ContractRepository, private commandBus: CommandBus) {}

  async handle(dto: CancelContractByTenantRequest, tenantId: string): Promise<Result<UUID, NotFoundException>> {
    const { contractId, departureDate } = dto;

    const contract = await this.contractRepository.findOne({ id: new UUID(contractId), tenantId: new UUID(tenantId) });

    if (!contract) {
      return Err(new NotFoundException('Contract not found'));
    }

    // cancellation request to admin will be here
    // now tenant can cancel manually only so cancellation mapper dont exist

    // Case 1. Tenant cancel contract manually
    contract.setPending();
    await this.contractRepository.save(contract);

    const departureDateIso = departureDate ? new DateISOVO(departureDate) : undefined;
    await this.manuallyCancellation(contract.id, departureDateIso);

    return Ok(contract.id);
  }

  private async manuallyCancellation(contractId: UUID, departureDate?: DateISOVO) {
    // manually cancellation logic
    const result = await this.commandBus.execute<CancelConcludedContractCommand, Result<UUID, Error>>(
      new CancelConcludedContractCommand({
        contractId,
        trigger: CancellationTrigger.TENANT,
        checkOutDate: departureDate,
      }),
    );

    if (result.isErr()) {
      throw result.unwrapErr();
    }
  }
}
