import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { UserIdentityRequestTypeormEntity } from './entities/user-identity-request.typeorm-entity';
import { UserIdentityRequestsTypeormRepository } from './repositories/user-identity-requests.typeorm-repository';

@Injectable()
export class UserIdentityRequestsAdminService extends TypeOrmCrudService<UserIdentityRequestTypeormEntity> {
  constructor(
    @InjectRepository(UserIdentityRequestsTypeormRepository)
    protected readonly repo: UserIdentityRequestsTypeormRepository,
  ) {
    super(repo);
  }
}
