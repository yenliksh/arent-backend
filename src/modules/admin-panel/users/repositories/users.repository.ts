import { EntityRepository, Repository } from 'typeorm';

import { UserTypeormEntity } from '../entities/user.typeorm-entity';

@EntityRepository(UserTypeormEntity)
export class UsersTypeormRepository extends Repository<UserTypeormEntity> {}
