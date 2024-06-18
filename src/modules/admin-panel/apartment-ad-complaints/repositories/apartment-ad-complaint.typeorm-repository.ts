import { EntityRepository, Repository } from 'typeorm';

import { ApartmentAdComplaintTypeormEntity } from '../entities/apartment-ad-complaint.typeorm-entity';

@EntityRepository(ApartmentAdComplaintTypeormEntity)
export class ApartmentAdComplaintTypeormRepository extends Repository<ApartmentAdComplaintTypeormEntity> {}
