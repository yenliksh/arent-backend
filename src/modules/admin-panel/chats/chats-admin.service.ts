import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ChatTypeormEntity } from './entities/chat.typeorm-entity';
import { ChatsTypeormRepository } from './repositories/chats.repository';

@Injectable()
export class ChatsAdminService extends TypeOrmCrudService<ChatTypeormEntity> {
  constructor(@InjectRepository(ChatsTypeormRepository) protected readonly repo: ChatsTypeormRepository) {
    super(repo);
  }
}
