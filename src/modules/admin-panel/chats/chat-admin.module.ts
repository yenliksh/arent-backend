import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsAdminController } from './chats-admin.controller';
import { ChatsAdminService } from './chats-admin.service';
import { ChatsTypeormRepository } from './repositories/chats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatsTypeormRepository])],
  controllers: [ChatsAdminController],
  providers: [ChatsAdminService],
})
export class ChatAdminModule {}
