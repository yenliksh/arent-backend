import { EntityRepository, Repository } from 'typeorm';

import { ChatTypeormEntity } from '../entities/chat.typeorm-entity';

@EntityRepository(ChatTypeormEntity)
export class ChatsTypeormRepository extends Repository<ChatTypeormEntity> {}
