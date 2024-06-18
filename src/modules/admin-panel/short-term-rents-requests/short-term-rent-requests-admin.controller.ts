import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { toMinorUnit } from '@libs/utils/minimal-unit.helper';
import { AdminPanelHeaderInterceptor } from '@modules/admin-panel/common/interceptors/admin-panel-header.interceptor';
import { TokenType } from '@modules/auth/types';
import { Body, Controller, HttpException, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Result } from 'oxide.ts';
import { ApproveAdShortTermRentCommand } from 'src/rental-context/domains/apartment-ad/commands/approve-ad-short-term-rent/aprove.ad-short-term-rent.command';
import { RejectAdShortTermRentCommand } from 'src/rental-context/domains/apartment-ad/commands/reject-ad-short-term-rent/reject-ad-short-rent.command';
import { ApartmentAdMediaModel } from 'src/rental-context/domains/apartment-ad/models/sub-models/apartment-ad-media.model';

import { RejectShortTermRentsRequestsDto } from './dtos/reject-short-term-rents-request.dto';
import { ShortTermRentRequestTypeormEntity } from './entities/short-term-rent-request.typeorm-entity';
import { ShortTermRentRequestsAdminService } from './short-term-rent-requests-admin.service';

@ApiTags('Admin-panel.ShortTermRentRequests')
@ApiBearerAuth()
@Crud({
  model: {
    type: ShortTermRentRequestTypeormEntity,
  },

  query: {
    alwaysPaginate: true,
  },

  routes: {
    only: ['getOneBase', 'getManyBase'],
    getManyBase: {
      interceptors: [new AdminPanelHeaderInterceptor()],
    },
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
@Controller('admin-panel/short-term-rent-requests')
export class ShortTermRentRequestsAdminController implements CrudController<ShortTermRentRequestTypeormEntity> {
  constructor(public service: ShortTermRentRequestsAdminService, private commandBus: CommandBus) {}

  get base(): CrudController<ShortTermRentRequestTypeormEntity> {
    return this;
  }

  @Override('getOneBase')
  async getOne(@ParsedRequest() req: CrudRequest) {
    const data = await this.base.getOneBase?.(req);

    if (!data) {
      return data;
    }

    return {
      ...data,
      cost: toMinorUnit(data.cost),
      media: {
        photos: data.media?.photos.map(ApartmentAdMediaModel.create) || [],
        videos: data.media?.videos.map(ApartmentAdMediaModel.create) || [],
      },
    };
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest) {
    const data = await this.base.getManyBase?.(req);

    if (!data) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map<ShortTermRentRequestTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
        media: {
          photos: i.media?.photos.map(ApartmentAdMediaModel.create) || [],
          videos: i.media?.videos.map(ApartmentAdMediaModel.create) || [],
        },
      }));
    }

    return {
      ...data,
      data: data.data.map<ShortTermRentRequestTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
        media: {
          photos: i.media?.photos.map(ApartmentAdMediaModel.create) || [],
          videos: i.media?.videos.map(ApartmentAdMediaModel.create) || [],
        },
      })),
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/approve')
  @ApiOperation({
    summary: 'Approve short term rent period apartment ad',
  })
  async approve(@Param('id', new ParseUUIDPipe()) apartmentId: string) {
    const resp = await this.commandBus.execute<ApproveAdShortTermRentCommand, Result<UUID, HttpException>>(
      new ApproveAdShortTermRentCommand(apartmentId),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.unwrap().value;
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/reject')
  @ApiBody({ type: RejectShortTermRentsRequestsDto })
  @ApiOperation({
    summary: 'Reject short term rent period apartment ad',
  })
  async reject(@Param('id', new ParseUUIDPipe()) apartmentId: string, @Body() dto: RejectShortTermRentsRequestsDto) {
    const resp = await this.commandBus.execute<RejectAdShortTermRentCommand, Result<UUID, HttpException>>(
      new RejectAdShortTermRentCommand(apartmentId, dto.declineReason),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.unwrap().value;
  }
}
