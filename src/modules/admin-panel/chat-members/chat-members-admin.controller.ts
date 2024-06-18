import { JwtAuthGuard } from '@infrastructure/guards';
import { TokenType } from '@modules/auth/types';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { ChatMembersAdminService } from './chat-members-admin.service';
import { ChatMemberTypeormEntity } from './entities/chat-member.typeorm-entity';

@ApiTags('Admin-panel.Chat-Members')
@ApiBearerAuth()
@Crud({
  model: {
    type: ChatMemberTypeormEntity,
  },

  query: {
    alwaysPaginate: true,
  },

  routes: {
    only: ['getManyBase', 'getOneBase'],
  },

  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@UseGuards(JwtAuthGuard(TokenType.ADMIN))
@Controller('admin-panel/chat-members')
export class ChatMembersAdminController implements CrudController<ChatMemberTypeormEntity> {
  constructor(public service: ChatMembersAdminService) {}
}
