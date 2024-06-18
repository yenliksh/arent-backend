import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { LongTermRentRequestTypeormEntity } from './entities/long-term-rent-request.typeorm-entity';
import { LongTermRentRequestsTypeormRepository } from './repositories/long-term-rent-requests.typeorm-repository';
export declare class LongTermRentRequestsAdminService extends TypeOrmCrudService<LongTermRentRequestTypeormEntity> {
    protected readonly repo: LongTermRentRequestsTypeormRepository;
    constructor(repo: LongTermRentRequestsTypeormRepository);
}
