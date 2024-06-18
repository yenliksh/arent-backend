import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { FindChatRequest } from './find-chat.request';
export declare class FindChatService {
    handle(dto: FindChatRequest, userId: UserOrmEntity['id']): Promise<Result<ChatOrmEntity, HttpException>>;
}
