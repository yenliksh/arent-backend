import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatMembersAdminController } from './chat-members-admin.controller';
import { ChatMembersAdminService } from './chat-members-admin.service';
import { ChatMembersTypeormRepository } from './repositories/chat-members.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMembersTypeormRepository])],
  controllers: [ChatMembersAdminController],
  providers: [ChatMembersAdminService],
})
export class ChatMemberAdminModule {}
