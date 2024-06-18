import { CommandBus } from '@nestjs/cqrs';
import { CrudController } from '@nestjsx/crud';
import { ApartmentAdComplaintAdminService } from './apartment-ad-complaint.service';
import { ApartmentAdComplaintTypeormEntity } from './entities/apartment-ad-complaint.typeorm-entity';
export declare class ApartmentAdComplaintAdminController implements CrudController<ApartmentAdComplaintTypeormEntity> {
    service: ApartmentAdComplaintAdminService;
    private commandBus;
    constructor(service: ApartmentAdComplaintAdminService, commandBus: CommandBus);
    viewedApartmentAdComplaint(apartmentAdComplaintId: string): Promise<string>;
}
