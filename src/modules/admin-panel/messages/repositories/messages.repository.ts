import { EntityRepository, Repository } from 'typeorm';

import { MessageTypeormEntity } from '../entities/message.typeorm-entity';

@EntityRepository(MessageTypeormEntity)
export class MessagesTypeormRepository extends Repository<MessageTypeormEntity> {}
