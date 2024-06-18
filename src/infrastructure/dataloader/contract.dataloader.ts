import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ContractOrmEntityLoader implements NestDataLoader<ContractOrmEntity['id'], ContractOrmEntity | undefined> {
  generateDataLoader(): DataLoader<ContractOrmEntity['id'], ContractOrmEntity | undefined> {
    return new DataLoader<string, ContractOrmEntity | undefined>(async (contractIds) => {
      const contract = await ContractOrmEntity.query().findByIds(contractIds as string[]);
      return contractIds.map((id) => contract.find((contract) => contract.id === id));
    });
  }
}
