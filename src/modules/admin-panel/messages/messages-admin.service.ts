import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { MessageTypeormEntity } from './entities/message.typeorm-entity';
import { MessagesTypeormRepository } from './repositories/messages.repository';

@Injectable()
export class MessagesAdminService extends TypeOrmCrudService<MessageTypeormEntity> {
  constructor(@InjectRepository(MessagesTypeormRepository) protected readonly repo: MessagesTypeormRepository) {
    super(repo);
  }
}
