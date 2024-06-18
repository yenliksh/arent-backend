import { CrudController } from '@nestjsx/crud';
import { ChatsAdminService } from './chats-admin.service';
import { ChatTypeormEntity } from './entities/chat.typeorm-entity';
export declare class ChatsAdminController implements CrudController<ChatTypeormEntity> {
    service: ChatsAdminService;
    constructor(service: ChatsAdminService);
}
