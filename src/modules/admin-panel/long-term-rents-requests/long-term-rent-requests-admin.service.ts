import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { LongTermRentRequestTypeormEntity } from './entities/long-term-rent-request.typeorm-entity';
import { LongTermRentRequestsTypeormRepository } from './repositories/long-term-rent-requests.typeorm-repository';

@Injectable()
export class LongTermRentRequestsAdminService extends TypeOrmCrudService<LongTermRentRequestTypeormEntity> {
  constructor(
    @InjectRepository(LongTermRentRequestsTypeormRepository)
    protected readonly repo: LongTermRentRequestsTypeormRepository,
  ) {
    super(repo);
  }
}
