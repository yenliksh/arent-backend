import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ChatTypeormEntity } from './entities/chat.typeorm-entity';
import { ChatsTypeormRepository } from './repositories/chats.repository';
export declare class ChatsAdminService extends TypeOrmCrudService<ChatTypeormEntity> {
    protected readonly repo: ChatsTypeormRepository;
    constructor(repo: ChatsTypeormRepository);
}
