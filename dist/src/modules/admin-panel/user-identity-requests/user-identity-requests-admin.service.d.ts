import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserIdentityRequestTypeormEntity } from './entities/user-identity-request.typeorm-entity';
import { UserIdentityRequestsTypeormRepository } from './repositories/user-identity-requests.typeorm-repository';
export declare class UserIdentityRequestsAdminService extends TypeOrmCrudService<UserIdentityRequestTypeormEntity> {
    protected readonly repo: UserIdentityRequestsTypeormRepository;
    constructor(repo: UserIdentityRequestsTypeormRepository);
}
