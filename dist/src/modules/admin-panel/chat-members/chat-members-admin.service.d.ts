import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ChatMemberTypeormEntity } from './entities/chat-member.typeorm-entity';
import { ChatMembersTypeormRepository } from './repositories/chat-members.repository';
export declare class ChatMembersAdminService extends TypeOrmCrudService<ChatMemberTypeormEntity> {
    protected readonly repo: ChatMembersTypeormRepository;
    constructor(repo: ChatMembersTypeormRepository);
}
