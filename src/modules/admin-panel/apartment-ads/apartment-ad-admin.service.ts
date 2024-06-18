import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ApartmentAdTypeormEntity } from './entities/apartment-ad.typeorm-entity';
import { ApartmentAdTypeormRepository } from './repositories/apartment-ad.typeorm-repository';

@Injectable()
export class ApartmentAdAdminService extends TypeOrmCrudService<ApartmentAdTypeormEntity> {
  constructor(@InjectRepository(ApartmentAdTypeormRepository) protected readonly repo: ApartmentAdTypeormRepository) {
    super(repo);
  }
}
