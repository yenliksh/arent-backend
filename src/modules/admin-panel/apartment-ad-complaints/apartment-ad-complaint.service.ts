import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ApartmentAdComplaintTypeormEntity } from './entities/apartment-ad-complaint.typeorm-entity';
import { ApartmentAdComplaintTypeormRepository } from './repositories/apartment-ad-complaint.typeorm-repository';

@Injectable()
export class ApartmentAdComplaintAdminService extends TypeOrmCrudService<ApartmentAdComplaintTypeormEntity> {
  constructor(
    @InjectRepository(ApartmentAdComplaintTypeormRepository)
    protected readonly repo: ApartmentAdComplaintTypeormRepository,
  ) {
    super(repo);
  }
}
