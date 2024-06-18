import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LongTermRentRequestsAdminController } from './long-term-rent-requests-admin.controller';
import { LongTermRentRequestsAdminService } from './long-term-rent-requests-admin.service';
import { LongTermRentRequestsTypeormRepository } from './repositories/long-term-rent-requests.typeorm-repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([LongTermRentRequestsTypeormRepository])],
  controllers: [LongTermRentRequestsAdminController],
  providers: [LongTermRentRequestsAdminService],
})
export class LongTermRentRequestsAdminModule {}
