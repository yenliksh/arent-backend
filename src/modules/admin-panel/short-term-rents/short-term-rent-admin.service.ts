import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ShortTermRentTypeormEntity } from './entities/short-term-rent.typeorm-entity';
import { ShortTermRentTypeormRepository } from './repositories/short-term-rent.typeorm-repository';

@Injectable()
export class ShortTermRentAdminService extends TypeOrmCrudService<ShortTermRentTypeormEntity> {
  constructor(
    @InjectRepository(ShortTermRentTypeormRepository) protected readonly repo: ShortTermRentTypeormRepository,
  ) {
    super(repo);
  }
}
