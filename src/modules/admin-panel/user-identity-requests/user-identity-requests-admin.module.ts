import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserIdentityRequestsTypeormRepository } from './repositories/user-identity-requests.typeorm-repository';
import { UserIdentityRequestsAdminController } from './user-identity-requests-admin.controller';
import { UserIdentityRequestsAdminService } from './user-identity-requests-admin.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserIdentityRequestsTypeormRepository])],
  controllers: [UserIdentityRequestsAdminController],
  providers: [UserIdentityRequestsAdminService],
})
export class UserIdentityRequestsAdminModule {}
