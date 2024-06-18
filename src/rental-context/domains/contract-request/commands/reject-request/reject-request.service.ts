import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ContractRequestRepository } from 'src/rental-context/domain-repositories/contract-request/contract-request.repository';

import { RejectRequest } from './reject-request.request.dto';

@Injectable()
export class RejectRequestService {
  constructor(private readonly contractRequestRepository: ContractRequestRepository) {}

  async handle(userId: UUID, dto: RejectRequest): Promise<Result<UUID, ArgumentInvalidException | HttpException>> {
    const { contractRequestId, reason } = dto;

    const contractRequest = await this.contractRequestRepository.findOneWithUserId(contractRequestId, userId.value);

    if (!contractRequest) {
      return Err(new NotFoundException());
    }

    contractRequest.reject(reason);

    await this.contractRequestRepository.save(contractRequest);

    return Ok(contractRequest.id);
  }
}
