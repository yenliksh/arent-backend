import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserTypeormEntity } from './entities/user.typeorm-entity';
import { UsersTypeormRepository } from './repositories/users.repository';
export declare class UsersAdminService extends TypeOrmCrudService<UserTypeormEntity> {
    protected readonly repo: UsersTypeormRepository;
    constructor(repo: UsersTypeormRepository);
}
