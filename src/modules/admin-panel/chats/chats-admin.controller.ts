import { JwtAuthGuard } from '@infrastructure/guards';
import { TokenType } from '@modules/auth/types';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { ChatsAdminService } from './chats-admin.service';
import { ChatTypeormEntity } from './entities/chat.typeorm-entity';

@ApiTags('Admin-panel.Chats')
@ApiBearerAuth()
@Crud({
  model: {
    type: ChatTypeormEntity,
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
@Controller('admin-panel/chats')
export class ChatsAdminController implements CrudController<ChatTypeormEntity> {
  constructor(public service: ChatsAdminService) {}
}
