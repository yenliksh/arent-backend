import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesAdminController } from './messages-admin.controller';
import { MessagesAdminService } from './messages-admin.service';
import { MessagesTypeormRepository } from './repositories/messages.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesTypeormRepository])],
  controllers: [MessagesAdminController],
  providers: [MessagesAdminService],
})
export class MessageAdminModule {}
