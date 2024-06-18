import { ApartmentAdIdentificatorTypeormRepository } from '@modules/admin-panel/apartment-ad-identificator/repositories/apartment-ad-identificator.typeorm-repository';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApartmentIdentificatorController } from './apartment-identificator.controller';
import { ApartmentIdentificatorService } from './apartment-identificator.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ApartmentAdIdentificatorTypeormRepository])],
  controllers: [ApartmentIdentificatorController],
  providers: [ApartmentIdentificatorService],
})
export class ApartmentIdentificatorModule {}
