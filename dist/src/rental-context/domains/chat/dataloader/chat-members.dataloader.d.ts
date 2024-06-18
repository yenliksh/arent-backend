import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class ChatMembersLoader implements NestDataLoader<UserOrmEntity['id'], UserOrmEntity[]> {
    generateDataLoader(): DataLoader<UserOrmEntity['id'], UserOrmEntity[]>;
}
