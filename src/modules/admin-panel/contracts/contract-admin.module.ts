import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsAdminController } from './contracts-admin.controller';
import { ContractsAdminService } from './contracts-admin.service';
import { ContractsTypeormRepository } from './repositories/contracts.repository';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([ContractsTypeormRepository])],
  controllers: [ContractsAdminController],
  providers: [ContractsAdminService],
})
export class ContractAdminModule {}
