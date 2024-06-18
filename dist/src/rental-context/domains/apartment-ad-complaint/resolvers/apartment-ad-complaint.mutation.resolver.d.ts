import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { CommandBus } from '@nestjs/cqrs';
import { CreateApartmentAdComplaintRequest } from '../commands/create-apartment-ad-complaint/create-apartment-ad-complaint.request.dto';
import { ApartmentAdComplaintResponse } from '../dtos/apartment-ad-complaint.response.dto';
export declare class ApartmentAdComplaintGraphqlResolver {
    private commandBus;
    constructor(commandBus: CommandBus);
    sendApartmentAdComplaint(userId: UserOrmEntity['id'], input: CreateApartmentAdComplaintRequest): Promise<ApartmentAdComplaintResponse>;
}
