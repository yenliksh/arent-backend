import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApartmentAdComplaintAdminController } from './apartment-ad-complaint.controller';
import { ApartmentAdComplaintAdminService } from './apartment-ad-complaint.service';
import { ApartmentAdComplaintTypeormRepository } from './repositories/apartment-ad-complaint.typeorm-repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ApartmentAdComplaintTypeormRepository])],
  controllers: [ApartmentAdComplaintAdminController],
  providers: [ApartmentAdComplaintAdminService],
})
export class ApartmentAdComplaintModule {}
