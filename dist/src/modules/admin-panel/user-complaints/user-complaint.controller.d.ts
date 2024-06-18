import { CommandBus } from '@nestjs/cqrs';
import { CrudController } from '@nestjsx/crud';
import { UserComplaintTypeormEntity } from './entities/user-complaint.typeorm-entity';
import { UserComplaintAdminService } from './user-complaint.service';
export declare class UserComplaintAdminController implements CrudController<UserComplaintTypeormEntity> {
    service: UserComplaintAdminService;
    private commandBus;
    constructor(service: UserComplaintAdminService, commandBus: CommandBus);
    viewUserComplaint(userComplaintId: string): Promise<string>;
}
