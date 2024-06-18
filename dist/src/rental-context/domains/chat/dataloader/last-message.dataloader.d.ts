import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class LastMessageLoader implements NestDataLoader<MessageOrmEntity['id'], MessageOrmEntity | undefined> {
    generateDataLoader(): DataLoader<MessageOrmEntity['id'], MessageOrmEntity | undefined>;
}
