import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { FindMessageRequest } from './find-message.request';

@Injectable()
export class FindMessageService {
  async handle(dto: FindMessageRequest, userId: UserOrmEntity['id']): Promise<Result<MessageOrmEntity, HttpException>> {
    const { id } = dto;
    const message = await MessageOrmEntity.query().where({ senderId: userId }).findById(id);

    if (!message) {
      return Err(new NotFoundException('Message not found'));
    }

    return Ok(message);
  }
}
