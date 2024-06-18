import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LongTermRentAdminController } from './long-term-rent-admin.controller';
import { LongTermRentAdminService } from './long-term-rent-admin.service';
import { LongTermRentTypeormRepository } from './repositories/long-term-rent.typeorm-repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([LongTermRentTypeormRepository])],
  controllers: [LongTermRentAdminController],
  providers: [LongTermRentAdminService],
})
export class LongTermRentAdminModule {}
