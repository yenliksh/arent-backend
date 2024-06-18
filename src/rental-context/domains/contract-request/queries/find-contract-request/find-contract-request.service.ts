import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { FindContractRequestRequest } from './find-contract-request.request.dto';

@Injectable()
export class FindContractRequestService {
  async handle(
    userId: UserOrmEntity['id'],
    dto: FindContractRequestRequest,
  ): Promise<Result<ContractRequestOrmEntity, HttpException>> {
    const { id } = dto;
    const contractRequest = await ContractRequestOrmEntity.query()
      .rightJoinRelated({ apartmentAd: true })
      .whereRaw(`(contract_requests."tenantId" = '${userId}' OR "apartmentAd"."landlordId" = '${userId}')`)
      .findById(id);

    if (!contractRequest) {
      return Err(new NotFoundException('Contract request not found'));
    }

    return Ok(contractRequest);
  }
}
