import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class UserOrmEntityLoader implements NestDataLoader<UserOrmEntity['id'], UserOrmEntity | undefined> {
    generateDataLoader(): DataLoader<UserOrmEntity['id'], UserOrmEntity | undefined>;
}
