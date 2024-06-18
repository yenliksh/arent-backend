import { EntityRepository, Repository } from 'typeorm';

import { ShortTermRentRequestTypeormEntity } from '../entities/short-term-rent-request.typeorm-entity';

@EntityRepository(ShortTermRentRequestTypeormEntity)
export class ShortTermRentRequestsTypeormRepository extends Repository<ShortTermRentRequestTypeormEntity> {}
