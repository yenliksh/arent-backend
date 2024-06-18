import { EntityRepository, Repository } from 'typeorm';

import { ContractTypeormEntity } from '../entities/contract.typeorm-entity';

@EntityRepository(ContractTypeormEntity)
export class ContractsTypeormRepository extends Repository<ContractTypeormEntity> {}
