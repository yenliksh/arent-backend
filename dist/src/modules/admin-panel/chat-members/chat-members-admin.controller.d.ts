import { CrudController } from '@nestjsx/crud';
import { ChatMembersAdminService } from './chat-members-admin.service';
import { ChatMemberTypeormEntity } from './entities/chat-member.typeorm-entity';
export declare class ChatMembersAdminController implements CrudController<ChatMemberTypeormEntity> {
    service: ChatMembersAdminService;
    constructor(service: ChatMembersAdminService);
}
