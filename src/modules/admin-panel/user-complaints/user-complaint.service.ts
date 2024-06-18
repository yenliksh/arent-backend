import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { UserComplaintTypeormEntity } from './entities/user-complaint.typeorm-entity';
import { UserComplaintTypeormRepository } from './repositories/user-complaint.typeorm-repository';

@Injectable()
export class UserComplaintAdminService extends TypeOrmCrudService<UserComplaintTypeormEntity> {
  constructor(
    @InjectRepository(UserComplaintTypeormRepository)
    protected readonly repo: UserComplaintTypeormRepository,
  ) {
    super(repo);
  }
}
