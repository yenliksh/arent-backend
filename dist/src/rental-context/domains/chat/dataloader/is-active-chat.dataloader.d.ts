import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class IsActiveChatLoader implements NestDataLoader<ContractOrmEntity['id'], boolean | undefined> {
    generateDataLoader(): DataLoader<ContractOrmEntity['id'], boolean | undefined>;
}
