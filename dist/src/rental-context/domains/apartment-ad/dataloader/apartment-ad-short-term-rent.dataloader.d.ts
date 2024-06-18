import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class ApartmentAdShortTermRentOrmEntityLoader implements NestDataLoader<ShortTermRentOrmEntity['id'], ShortTermRentOrmEntity | undefined> {
    generateDataLoader(): DataLoader<ShortTermRentOrmEntity['id'], ShortTermRentOrmEntity | undefined>;
}
