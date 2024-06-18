import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { LongTermRentTypeormEntity } from './entities/long-term-rent.typeorm-entity';
import { LongTermRentTypeormRepository } from './repositories/long-term-rent.typeorm-repository';

@Injectable()
export class LongTermRentAdminService extends TypeOrmCrudService<LongTermRentTypeormEntity> {
  constructor(@InjectRepository(LongTermRentTypeormRepository) protected readonly repo: LongTermRentTypeormRepository) {
    super(repo);
  }
}
