import { AdminSetViewedApartmentAdComplaintCommand } from '@domains/apartment-ad-complaint/commands/admins/admin-set-viewed-apartment-ad-complaint/admin-set-viewed-apartment-ad-complaint.command';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { TokenType } from '@modules/auth/types';
import { Controller, HttpException, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Result } from 'oxide.ts';

import { ApartmentAdComplaintAdminService } from './apartment-ad-complaint.service';
import { ApartmentAdComplaintTypeormEntity } from './entities/apartment-ad-complaint.typeorm-entity';

@ApiTags('Admin-panel.ApartmentAdComplaint')
@ApiBearerAuth()
@Crud({
  model: {
    type: ApartmentAdComplaintTypeormEntity,
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
@Controller('admin-panel/apartment-ad-complaint')
export class ApartmentAdComplaintAdminController implements CrudController<ApartmentAdComplaintTypeormEntity> {
  constructor(public service: ApartmentAdComplaintAdminService, private commandBus: CommandBus) {}

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/viewed')
  @ApiOperation({
    summary: 'Viewed apartment ad complaint',
  })
  async viewedApartmentAdComplaint(@Param('id', new ParseUUIDPipe()) apartmentAdComplaintId: string) {
    const resp = await this.commandBus.execute<AdminSetViewedApartmentAdComplaintCommand, Result<UUID, HttpException>>(
      new AdminSetViewedApartmentAdComplaintCommand(apartmentAdComplaintId),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.unwrap().value;
  }
}
