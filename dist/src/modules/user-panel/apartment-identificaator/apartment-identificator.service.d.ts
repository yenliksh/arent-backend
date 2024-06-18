import { ApartmentAdIdentificatorTypeormEntity } from '@modules/admin-panel/apartment-ad-identificator/entities/apartment-ad-identificator.typeorm-entity';
import { ApartmentAdIdentificatorTypeormRepository } from '@modules/admin-panel/apartment-ad-identificator/repositories/apartment-ad-identificator.typeorm-repository';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
export declare class ApartmentIdentificatorService extends TypeOrmCrudService<ApartmentAdIdentificatorTypeormEntity> {
    protected readonly repo: ApartmentAdIdentificatorTypeormRepository;
    constructor(repo: ApartmentAdIdentificatorTypeormRepository);
}
