import { InnopayPaymentPageData } from '@domains/contract/domain/types';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class InnopayPaymentPageByContractIdLoader
  implements NestDataLoader<ContractOrmEntity['id'], InnopayPaymentPageData | undefined>
{
  generateDataLoader(): DataLoader<ContractOrmEntity['id'], InnopayPaymentPageData | undefined> {
    return new DataLoader<string, InnopayPaymentPageData | undefined>(async (contractIds) => {
      const isPaymentPageDataValid = <T>(obj: InnopayPaymentPageData | T): obj is InnopayPaymentPageData => {
        return (
          (obj as InnopayPaymentPageData)?.startAt !== undefined && (obj as InnopayPaymentPageData)?.url !== undefined
        );
      };

      const contracts = await ContractOrmEntity.query().findByIds(contractIds as string[]);

      return contractIds.map((id) => {
        const contract = contracts.find((contract) => contract.id === id);

        const innopayPaymentPageData = { url: contract?.paymentUrl, startAt: contract?.paymentUrlStartAt };

        if (!isPaymentPageDataValid(innopayPaymentPageData)) {
          return;
        }

        return innopayPaymentPageData as InnopayPaymentPageData;
      });
    });
  }
}
