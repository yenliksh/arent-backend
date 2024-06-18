import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ApartmentAdForContractLoader
  implements NestDataLoader<ApartmentAdOrmEntity['id'], ApartmentAdOrmEntity | undefined>
{
  generateDataLoader(): DataLoader<ApartmentAdOrmEntity['id'], ApartmentAdOrmEntity | undefined> {
    return new DataLoader<string, ApartmentAdOrmEntity | undefined>(async (contractIds) => {
      const contractsSubQuery = ContractOrmEntity.query().whereIn('id', contractIds as string[]);
      const apartmentAds = await ContractOrmEntity.relatedQuery('apartmentAd')
        .for(contractsSubQuery)
        .withGraphFetched({ contracts: true }, { joinOperation: 'innerJoin' })
        .withGraphFetched({ shortTermRent: true, longTermRent: true }, { joinOperation: 'leftJoin' })
        .modifyGraph('contracts', (builder) => {
          builder.select('id').whereIn('id', contractIds as string[]);
        });

      return contractIds.map((id) =>
        apartmentAds.find((apartmentAd) => apartmentAd.contracts?.some((contract) => contract.id === id)),
      );
    });
  }
}
