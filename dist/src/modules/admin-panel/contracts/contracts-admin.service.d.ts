import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContractTypeormEntity } from './entities/contract.typeorm-entity';
import { ContractsTypeormRepository } from './repositories/contracts.repository';
export declare class ContractsAdminService extends TypeOrmCrudService<ContractTypeormEntity> {
    protected readonly repo: ContractsTypeormRepository;
    constructor(repo: ContractsTypeormRepository);
}
