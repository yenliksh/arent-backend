import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ShortTermRentRequestTypeormEntity } from './entities/short-term-rent-request.typeorm-entity';
import { ShortTermRentRequestsTypeormRepository } from './repositories/short-term-rent-requests.typeorm-repository';
export declare class ShortTermRentRequestsAdminService extends TypeOrmCrudService<ShortTermRentRequestTypeormEntity> {
    protected readonly repo: ShortTermRentRequestsTypeormRepository;
    constructor(repo: ShortTermRentRequestsTypeormRepository);
}
