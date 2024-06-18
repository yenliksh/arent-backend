import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserComplaintTypeormEntity } from './entities/user-complaint.typeorm-entity';
import { UserComplaintTypeormRepository } from './repositories/user-complaint.typeorm-repository';
export declare class UserComplaintAdminService extends TypeOrmCrudService<UserComplaintTypeormEntity> {
    protected readonly repo: UserComplaintTypeormRepository;
    constructor(repo: UserComplaintTypeormRepository);
}
