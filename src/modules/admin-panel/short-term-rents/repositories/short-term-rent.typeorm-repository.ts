import { EntityRepository, Repository } from 'typeorm';

import { ShortTermRentTypeormEntity } from '../entities/short-term-rent.typeorm-entity';

@EntityRepository(ShortTermRentTypeormEntity)
export class ShortTermRentTypeormRepository extends Repository<ShortTermRentTypeormEntity> {}
