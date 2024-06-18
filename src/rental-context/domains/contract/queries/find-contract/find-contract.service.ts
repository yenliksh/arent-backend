import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { FindContractRequest } from './find-contract.request';

@Injectable()
export class FindContractService {
  async handle(
    dto: FindContractRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<ContractOrmEntity, HttpException>> {
    const { id } = dto;
    const contract = await ContractOrmEntity.query()
      .where((builder) => {
        builder.where({ landlordId: userId }).orWhere({ tenantId: userId });
      })
      .findById(id);

    if (!contract) {
      return Err(new NotFoundException('Contract not found'));
    }

    return Ok(contract);
  }
}
