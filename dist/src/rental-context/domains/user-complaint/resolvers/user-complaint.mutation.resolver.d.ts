import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserComplaintRequest } from '../commands/create-user-complaint/create-user-complaint.request.dto';
import { UserComplaintResponse } from '../dtos/user-complaint.response.dto';
export declare class UserComplaintGraphqlResolver {
    private commandBus;
    constructor(commandBus: CommandBus);
    sendApartmentAdComplaint(userId: UserOrmEntity['id'], input: CreateUserComplaintRequest): Promise<UserComplaintResponse>;
}
