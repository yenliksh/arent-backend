import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShortTermRentTypeormRepository } from './repositories/short-term-rent.typeorm-repository';
import { ShortTermRentAdminController } from './short-term-rent-admin.controller';
import { ShortTermRentAdminService } from './short-term-rent-admin.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ShortTermRentTypeormRepository])],
  controllers: [ShortTermRentAdminController],
  providers: [ShortTermRentAdminService],
})
export class ShortTermRentAdminModule {}
