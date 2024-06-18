import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class ApartmentAdLongTermRentOrmEntityLoader implements NestDataLoader<LongTermRentOrmEntity['id'], LongTermRentOrmEntity | undefined> {
    generateDataLoader(): DataLoader<LongTermRentOrmEntity['id'], LongTermRentOrmEntity | undefined>;
}
