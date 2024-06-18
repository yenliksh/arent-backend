import { EntityRepository, Repository } from 'typeorm';

import { LongTermRentRequestTypeormEntity } from '../entities/long-term-rent-request.typeorm-entity';

@EntityRepository(LongTermRentRequestTypeormEntity)
export class LongTermRentRequestsTypeormRepository extends Repository<LongTermRentRequestTypeormEntity> {}
