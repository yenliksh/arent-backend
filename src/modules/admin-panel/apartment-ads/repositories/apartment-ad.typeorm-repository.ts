import { EntityRepository, Repository } from 'typeorm';

import { ApartmentAdTypeormEntity } from '../entities/apartment-ad.typeorm-entity';

@EntityRepository(ApartmentAdTypeormEntity)
export class ApartmentAdTypeormRepository extends Repository<ApartmentAdTypeormEntity> {}
