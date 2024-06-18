import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShortTermRentRequestsTypeormRepository } from './repositories/short-term-rent-requests.typeorm-repository';
import { ShortTermRentRequestsAdminController } from './short-term-rent-requests-admin.controller';
import { ShortTermRentRequestsAdminService } from './short-term-rent-requests-admin.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShortTermRentRequestsTypeormRepository])],
  controllers: [ShortTermRentRequestsAdminController],
  providers: [ShortTermRentRequestsAdminService],
})
export class ShortTermRentRequestsAdminModule {}
