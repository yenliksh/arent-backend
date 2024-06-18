import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { Injectable, NotFoundException } from '@nestjs/common';

import { TenantContractCardRequest } from './tenant-contract-card.request';

@Injectable()
export class TenantContractCardService {
  async handle(dto: TenantContractCardRequest, userId: UserOrmEntity['id']): Promise<any> {
    const { id } = dto;

    const contractSubQuery = ContractOrmEntity.query().findOne({ id, tenantId: userId });

    const card = await ContractOrmEntity.relatedQuery('tenantInnopayCard')
      .for(contractSubQuery)
      .withGraphJoined('innopayUser')
      .modifyGraph('innopayUser', (builder) => {
        builder.where('userId', userId);
      })
      .limit(1)
      .first();

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return card;
  }
}
