import { EntityRepository, Repository } from 'typeorm';

import { LongTermRentTypeormEntity } from '../entities/long-term-rent.typeorm-entity';

@EntityRepository(LongTermRentTypeormEntity)
export class LongTermRentTypeormRepository extends Repository<LongTermRentTypeormEntity> {}
