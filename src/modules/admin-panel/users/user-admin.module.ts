import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersTypeormRepository } from './repositories/users.repository';
import { UsersAdminController } from './users-admin.controller';
import { UsersAdminService } from './users-admin.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UsersTypeormRepository])],
  controllers: [UsersAdminController],
  providers: [UsersAdminService],
})
export class UserAdminModule {}
