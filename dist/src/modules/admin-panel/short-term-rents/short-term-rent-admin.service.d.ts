import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ShortTermRentTypeormEntity } from './entities/short-term-rent.typeorm-entity';
import { ShortTermRentTypeormRepository } from './repositories/short-term-rent.typeorm-repository';
export declare class ShortTermRentAdminService extends TypeOrmCrudService<ShortTermRentTypeormEntity> {
    protected readonly repo: ShortTermRentTypeormRepository;
    constructor(repo: ShortTermRentTypeormRepository);
}
