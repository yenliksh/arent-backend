import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ApartmentAdIdentificatorTypeormEntity } from './entities/apartment-ad-identificator.typeorm-entity';
import { ApartmentAdIdentificatorTypeormRepository } from './repositories/apartment-ad-identificator.typeorm-repository';
export declare class ApartmentAdIdentificatorAdminService extends TypeOrmCrudService<ApartmentAdIdentificatorTypeormEntity> {
    protected readonly repo: ApartmentAdIdentificatorTypeormRepository;
    constructor(repo: ApartmentAdIdentificatorTypeormRepository);
}
