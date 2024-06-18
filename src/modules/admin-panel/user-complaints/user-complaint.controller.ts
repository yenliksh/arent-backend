import { AdminSetViewedUserComplaintCommand } from '@domains/user-complaint/commands/admins/admin-set-viewed-user-complaint.command';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { TokenType } from '@modules/auth/types';
import { Controller, HttpException, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Result } from 'oxide.ts';

import { UserComplaintTypeormEntity } from './entities/user-complaint.typeorm-entity';
import { UserComplaintAdminService } from './user-complaint.service';

@ApiTags('Admin-panel.UserComplaint')
@ApiBearerAuth()
@Crud({
  model: {
    type: UserComplaintTypeormEntity,
  },

  query: {
    alwaysPaginate: true,
  },

  routes: {
    only: ['getOneBase', 'getManyBase'],
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
@Controller('admin-panel/user-complaint')
export class UserComplaintAdminController implements CrudController<UserComplaintTypeormEntity> {
  constructor(public service: UserComplaintAdminService, private commandBus: CommandBus) {}

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/view')
  @ApiOperation({
    summary: 'View user complaint',
  })
  async viewUserComplaint(@Param('id', new ParseUUIDPipe()) userComplaintId: string) {
    const resp = await this.commandBus.execute<AdminSetViewedUserComplaintCommand, Result<UUID, HttpException>>(
      new AdminSetViewedUserComplaintCommand(userComplaintId),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.unwrap().value;
  }
}
