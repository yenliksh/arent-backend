import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApartmentAdAdminController } from './apartment-ad-admin.controller';
import { ApartmentAdAdminService } from './apartment-ad-admin.service';
import { ApartmentAdTypeormRepository } from './repositories/apartment-ad.typeorm-repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ApartmentAdTypeormRepository])],
  controllers: [ApartmentAdAdminController],
  providers: [ApartmentAdAdminService],
})
export class ApartmentAdAdminModule {}
