import { ApartmentAdIdentificatorTypeormEntity } from '@modules/admin-panel/apartment-ad-identificator/entities/apartment-ad-identificator.typeorm-entity';
import { ApartmentAdIdentificatorTypeormRepository } from '@modules/admin-panel/apartment-ad-identificator/repositories/apartment-ad-identificator.typeorm-repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ApartmentIdentificatorService extends TypeOrmCrudService<ApartmentAdIdentificatorTypeormEntity> {
  constructor(
    @InjectRepository(ApartmentAdIdentificatorTypeormRepository)
    protected readonly repo: ApartmentAdIdentificatorTypeormRepository,
  ) {
    super(repo);
  }
}
