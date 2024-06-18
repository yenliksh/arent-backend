import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ApartmentAdTypeormEntity } from './entities/apartment-ad.typeorm-entity';
import { ApartmentAdTypeormRepository } from './repositories/apartment-ad.typeorm-repository';
export declare class ApartmentAdAdminService extends TypeOrmCrudService<ApartmentAdTypeormEntity> {
    protected readonly repo: ApartmentAdTypeormRepository;
    constructor(repo: ApartmentAdTypeormRepository);
}
