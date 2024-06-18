import { EntityRepository, Repository } from 'typeorm';

import { UserIdentityRequestTypeormEntity } from '../entities/user-identity-request.typeorm-entity';

@EntityRepository(UserIdentityRequestTypeormEntity)
export class UserIdentityRequestsTypeormRepository extends Repository<UserIdentityRequestTypeormEntity> {}
