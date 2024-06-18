import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { Model } from 'objection';
declare type IChat = Omit<ChatOrmEntity, keyof Model>;
export declare class ChatTypeormEntity implements IChat {
    id: string;
    contractId: string;
    lastMessageId?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export {};
