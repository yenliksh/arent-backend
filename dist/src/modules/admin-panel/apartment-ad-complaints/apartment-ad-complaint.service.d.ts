import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ApartmentAdComplaintTypeormEntity } from './entities/apartment-ad-complaint.typeorm-entity';
import { ApartmentAdComplaintTypeormRepository } from './repositories/apartment-ad-complaint.typeorm-repository';
export declare class ApartmentAdComplaintAdminService extends TypeOrmCrudService<ApartmentAdComplaintTypeormEntity> {
    protected readonly repo: ApartmentAdComplaintTypeormRepository;
    constructor(repo: ApartmentAdComplaintTypeormRepository);
}
