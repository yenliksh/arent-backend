import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ApartmentAdIdentificatorTypeormEntity } from './entities/apartment-ad-identificator.typeorm-entity';
import { ApartmentAdIdentificatorTypeormRepository } from './repositories/apartment-ad-identificator.typeorm-repository';

@Injectable()
export class ApartmentAdIdentificatorAdminService extends TypeOrmCrudService<ApartmentAdIdentificatorTypeormEntity> {
  constructor(
    @InjectRepository(ApartmentAdIdentificatorTypeormRepository)
    protected readonly repo: ApartmentAdIdentificatorTypeormRepository,
  ) {
    super(repo);
  }
}
