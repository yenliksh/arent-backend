import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdIdentificatorTypeormEntity } from '@modules/admin-panel/apartment-ad-identificator/entities/apartment-ad-identificator.typeorm-entity';
import { CommandBus } from '@nestjs/cqrs';
import { CrudController } from '@nestjsx/crud';
import { ApartmentIdentificatorService } from './apartment-identificator.service';
export declare class ApartmentIdentificatorController implements CrudController<ApartmentAdIdentificatorTypeormEntity> {
    service: ApartmentIdentificatorService;
    private commandBus;
    constructor(service: ApartmentIdentificatorService, commandBus: CommandBus);
    get base(): CrudController<ApartmentAdIdentificatorTypeormEntity>;
    getApartmentIdentificator(id: string): Promise<ApartmentAdIdentificatorEntity>;
}
