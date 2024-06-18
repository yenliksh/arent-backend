import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class ApartmentAdOrmEntityLoader implements NestDataLoader<ApartmentAdOrmEntity['id'], ApartmentAdOrmEntity | undefined> {
    generateDataLoader(): DataLoader<ApartmentAdOrmEntity['id'], ApartmentAdOrmEntity | undefined>;
}
