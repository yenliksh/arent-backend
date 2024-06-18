import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class InnopayCardOrmEntityLoader implements NestDataLoader<InnopayCardOrmEntity['id'], InnopayCardOrmEntity | undefined> {
    generateDataLoader(): DataLoader<InnopayCardOrmEntity['id'], InnopayCardOrmEntity | undefined>;
}
