import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { ContractStatus } from '@infrastructure/enums';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class IsActiveChatLoader implements NestDataLoader<ContractOrmEntity['id'], boolean | undefined> {
  generateDataLoader(): DataLoader<ContractOrmEntity['id'], boolean | undefined> {
    return new DataLoader<string, boolean | undefined>(async (contractIds) => {
      const contracts = await ContractOrmEntity.query()
        .select('id', 'status')
        .findByIds(contractIds as string[]);

      return contractIds.map((id) => {
        const contract = contracts.find((contract) => contract.id === id);
        return contract && contract.status !== ContractStatus.REJECTED;
      });
    });
  }
}
