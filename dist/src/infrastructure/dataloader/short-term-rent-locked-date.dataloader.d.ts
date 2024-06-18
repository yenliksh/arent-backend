import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class ShortTermRentLockedDateOrmEntityLoader implements NestDataLoader<ShortTermRentOrmEntity['id'], ShortTermRentLockedDateOrmEntity[]> {
    generateDataLoader(): DataLoader<ShortTermRentOrmEntity['id'], ShortTermRentLockedDateOrmEntity[]>;
}
