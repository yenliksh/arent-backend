import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MessageTypeormEntity } from './entities/message.typeorm-entity';
import { MessagesTypeormRepository } from './repositories/messages.repository';
export declare class MessagesAdminService extends TypeOrmCrudService<MessageTypeormEntity> {
    protected readonly repo: MessagesTypeormRepository;
    constructor(repo: MessagesTypeormRepository);
}
