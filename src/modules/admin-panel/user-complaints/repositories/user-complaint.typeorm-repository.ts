import { EntityRepository, Repository } from 'typeorm';

import { UserComplaintTypeormEntity } from '../entities/user-complaint.typeorm-entity';

@EntityRepository(UserComplaintTypeormEntity)
export class UserComplaintTypeormRepository extends Repository<UserComplaintTypeormEntity> {}
