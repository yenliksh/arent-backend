import { EntityRepository, Repository } from 'typeorm';

import { ApartmentAdIdentificatorTypeormEntity } from '../entities/apartment-ad-identificator.typeorm-entity';

@EntityRepository(ApartmentAdIdentificatorTypeormEntity)
export class ApartmentAdIdentificatorTypeormRepository extends Repository<ApartmentAdIdentificatorTypeormEntity> {}
