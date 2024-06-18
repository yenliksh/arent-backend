import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ShortTermRentRequestTypeormEntity } from './entities/short-term-rent-request.typeorm-entity';
import { ShortTermRentRequestsTypeormRepository } from './repositories/short-term-rent-requests.typeorm-repository';

@Injectable()
export class ShortTermRentRequestsAdminService extends TypeOrmCrudService<ShortTermRentRequestTypeormEntity> {
  constructor(
    @InjectRepository(ShortTermRentRequestsTypeormRepository)
    protected readonly repo: ShortTermRentRequestsTypeormRepository,
  ) {
    super(repo);
  }
}
