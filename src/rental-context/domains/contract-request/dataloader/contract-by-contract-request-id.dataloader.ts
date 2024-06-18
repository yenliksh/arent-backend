import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ContractByContractRequestIdLoader
  implements NestDataLoader<ContractOrmEntity['id'], ContractOrmEntity | undefined>
{
  generateDataLoader(): DataLoader<ContractOrmEntity['id'], ContractOrmEntity | undefined> {
    return new DataLoader<string, ContractOrmEntity | undefined>(async (contractRequestsIds) => {
      const contracts = await ContractOrmEntity.query().whereIn('contractRequestId', contractRequestsIds as string[]);

      return contractRequestsIds.map((contractRequestId) =>
        contracts.find((contract) => contract.contractRequestId === contractRequestId),
      );
    });
  }
}
