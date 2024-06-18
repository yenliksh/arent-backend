import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { UserTypeormEntity } from './entities/user.typeorm-entity';
import { UsersTypeormRepository } from './repositories/users.repository';

@Injectable()
export class UsersAdminService extends TypeOrmCrudService<UserTypeormEntity> {
  constructor(@InjectRepository(UsersTypeormRepository) protected readonly repo: UsersTypeormRepository) {
    super(repo);
  }
}
