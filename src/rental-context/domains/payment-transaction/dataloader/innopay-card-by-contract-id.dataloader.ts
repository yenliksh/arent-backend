import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class InnopayCardByContractIdOrmEntityLoader
  implements NestDataLoader<InnopayCardOrmEntity['id'], InnopayCardOrmEntity | undefined>
{
  generateDataLoader(): DataLoader<InnopayCardOrmEntity['id'], InnopayCardOrmEntity | undefined> {
    return new DataLoader<string, InnopayCardOrmEntity | undefined>(async (contractIds) => {
      const contractSubQuery = ContractOrmEntity.query().findByIds(contractIds as string[]);
      const innopayCards = await ContractOrmEntity.relatedQuery('tenantInnopayCard')
        .for(contractSubQuery)
        .withGraphFetched({ contracts: true })
        .modifyGraph('contracts', (builder) => {
          builder.select('id').whereIn('id', contractIds as string[]);
        });

      return contractIds.map((id) =>
        innopayCards.find((innopayCard) => innopayCard.contracts?.some((contract) => contract.id === id)),
      );
    });
  }
}
