import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class ContractByContractRequestIdLoader implements NestDataLoader<ContractOrmEntity['id'], ContractOrmEntity | undefined> {
    generateDataLoader(): DataLoader<ContractOrmEntity['id'], ContractOrmEntity | undefined>;
}
