import { EntityRepository, Repository } from 'typeorm';

import { ChatMemberTypeormEntity } from '../entities/chat-member.typeorm-entity';

@EntityRepository(ChatMemberTypeormEntity)
export class ChatMembersTypeormRepository extends Repository<ChatMemberTypeormEntity> {}
