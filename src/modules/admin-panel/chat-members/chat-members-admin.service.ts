import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ChatMemberTypeormEntity } from './entities/chat-member.typeorm-entity';
import { ChatMembersTypeormRepository } from './repositories/chat-members.repository';

@Injectable()
export class ChatMembersAdminService extends TypeOrmCrudService<ChatMemberTypeormEntity> {
  constructor(@InjectRepository(ChatMembersTypeormRepository) protected readonly repo: ChatMembersTypeormRepository) {
    super(repo);
  }
}
