import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { FindMessageRequest } from './find-message.request';
export declare class FindMessageService {
    handle(dto: FindMessageRequest, userId: UserOrmEntity['id']): Promise<Result<MessageOrmEntity, HttpException>>;
}
