import { ContractCancelationOrmEntity } from '@infrastructure/database/entities/contract-cancelation.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class ContractCancelationOrmEntityLoader implements NestDataLoader<ContractCancelationOrmEntity['id'], ContractCancelationOrmEntity | undefined> {
    generateDataLoader(): DataLoader<ContractCancelationOrmEntity['id'], ContractCancelationOrmEntity | undefined>;
}
