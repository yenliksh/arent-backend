import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserComplaintTypeormRepository } from './repositories/user-complaint.typeorm-repository';
import { UserComplaintAdminController } from './user-complaint.controller';
import { UserComplaintAdminService } from './user-complaint.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserComplaintTypeormRepository])],
  controllers: [UserComplaintAdminController],
  providers: [UserComplaintAdminService],
})
export class UserComplaintModule {}
