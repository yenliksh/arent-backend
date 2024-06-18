import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { prependDomainUrlToFileKey } from '@libs/utils/file-key.helper';
import { getCfSignedUrl } from '@libs/utils/get-cf-signed-url';
import { toMinorUnit } from '@libs/utils/minimal-unit.helper';
import { AdminPanelHeaderInterceptor } from '@modules/admin-panel/common/interceptors/admin-panel-header.interceptor';
import { TokenType } from '@modules/auth/types';
import { Body, Controller, HttpException, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Result } from 'oxide.ts';
import { ApproveAdLongTermRentCommand } from 'src/rental-context/domains/apartment-ad/commands/approve-ad-long-term-rent/aprove.ad-long-term-rent.command';
import { RejectAdLongTermRentCommand } from 'src/rental-context/domains/apartment-ad/commands/reject-ad-long-term-rent/reject-ad-long-rent.command';
import { ApartmentAdMediaModel } from 'src/rental-context/domains/apartment-ad/models/sub-models/apartment-ad-media.model';

import { RejectLongTermRentsRequestsDto } from './dtos/reject-long-term-rents-requests.dto';
import { LongTermRentRequestTypeormEntity } from './entities/long-term-rent-request.typeorm-entity';
import { LongTermRentRequestsAdminService } from './long-term-rent-requests-admin.service';

@ApiTags('Admin-panel.LongTermRentRequests')
@ApiBearerAuth()
@Crud({
  model: {
    type: LongTermRentRequestTypeormEntity,
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
@Controller('admin-panel/long-term-rent-requests')
export class LongTermRentRequestsAdminController implements CrudController<LongTermRentRequestTypeormEntity> {
  constructor(public service: LongTermRentRequestsAdminService, private commandBus: CommandBus) {}

  get base(): CrudController<LongTermRentRequestTypeormEntity> {
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
      ownershipDocuments: data.ownershipDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
    };
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest) {
    const data = await this.base.getManyBase?.(req);

    if (!data) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map<LongTermRentRequestTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
        media: {
          photos: i.media?.photos.map(ApartmentAdMediaModel.create) || [],
          videos: i.media?.videos.map(ApartmentAdMediaModel.create) || [],
        },
        ownershipDocuments: i.ownershipDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      }));
    }

    return {
      ...data,
      data: data.data.map<LongTermRentRequestTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
        media: {
          photos: i.media?.photos.map(ApartmentAdMediaModel.create) || [],
          videos: i.media?.videos.map(ApartmentAdMediaModel.create) || [],
        },
        ownershipDocuments: i.ownershipDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      })),
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/approve')
  @ApiOperation({
    summary: 'Approve long term rent period apartment ad',
  })
  async approve(@Param('id', new ParseUUIDPipe()) apartmentId: string) {
    const resp = await this.commandBus.execute<ApproveAdLongTermRentCommand, Result<UUID, HttpException>>(
      new ApproveAdLongTermRentCommand(apartmentId),
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
  @ApiBody({ type: RejectLongTermRentsRequestsDto })
  @ApiOperation({
    summary: 'Reject long term rent period apartment ad',
  })
  async reject(@Param('id', new ParseUUIDPipe()) apartmentId: string, @Body() dto: RejectLongTermRentsRequestsDto) {
    const resp = await this.commandBus.execute<RejectAdLongTermRentCommand, Result<UUID, HttpException>>(
      new RejectAdLongTermRentCommand(apartmentId, dto.declineReason),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.unwrap().value;
  }
}
