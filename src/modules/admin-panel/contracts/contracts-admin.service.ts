import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ContractTypeormEntity } from './entities/contract.typeorm-entity';
import { ContractsTypeormRepository } from './repositories/contracts.repository';

@Injectable()
export class ContractsAdminService extends TypeOrmCrudService<ContractTypeormEntity> {
  constructor(@InjectRepository(ContractsTypeormRepository) protected readonly repo: ContractsTypeormRepository) {
    super(repo);
  }
}
