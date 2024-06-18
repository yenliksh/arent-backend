import { InnopayPaymentPageData } from '@domains/contract/domain/types';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class InnopayPaymentPageByContractIdLoader implements NestDataLoader<ContractOrmEntity['id'], InnopayPaymentPageData | undefined> {
    generateDataLoader(): DataLoader<ContractOrmEntity['id'], InnopayPaymentPageData | undefined>;
}
