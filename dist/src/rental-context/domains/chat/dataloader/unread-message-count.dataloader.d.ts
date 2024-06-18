import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export interface UnreadMessageCountLoaderProps {
    chatId: string;
    userId: string;
}
export declare class UnreadMessageCountLoader implements NestDataLoader<MessageOrmEntity['id'], number | undefined> {
    generateDataLoader(): DataLoader<MessageOrmEntity['id'], number | undefined>;
}
