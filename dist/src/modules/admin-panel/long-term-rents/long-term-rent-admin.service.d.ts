import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { LongTermRentTypeormEntity } from './entities/long-term-rent.typeorm-entity';
import { LongTermRentTypeormRepository } from './repositories/long-term-rent.typeorm-repository';
export declare class LongTermRentAdminService extends TypeOrmCrudService<LongTermRentTypeormEntity> {
    protected readonly repo: LongTermRentTypeormRepository;
    constructor(repo: LongTermRentTypeormRepository);
}
