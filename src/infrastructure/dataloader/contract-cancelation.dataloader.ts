import { ContractCancelationOrmEntity } from '@infrastructure/database/entities/contract-cancelation.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ContractCancelationOrmEntityLoader
  implements NestDataLoader<ContractCancelationOrmEntity['id'], ContractCancelationOrmEntity | undefined>
{
  generateDataLoader(): DataLoader<ContractCancelationOrmEntity['id'], ContractCancelationOrmEntity | undefined> {
    return new DataLoader<string, ContractCancelationOrmEntity | undefined>(async (contractIds) => {
      const contractCancellations = await ContractCancelationOrmEntity.query().whereIn(
        'contractId',
        contractIds as string[],
      );

      return contractIds.map((id) =>
        contractCancellations.find((contractCancelation) => contractCancelation.contractId === id),
      );
    });
  }
}
