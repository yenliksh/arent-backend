import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { prependDomainUrlToFileKey } from '@libs/utils/file-key.helper';
import { getCfSignedUrl } from '@libs/utils/get-cf-signed-url';
import { toMinorUnit } from '@libs/utils/minimal-unit.helper';
import { TokenType } from '@modules/auth/types';
import { Controller, HttpException, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Result } from 'oxide.ts';
import { PauseApartmentAdByTypeCommand } from 'src/rental-context/domains/apartment-ad/commands/pause-apartment-ad/pause-apartment-ad-by-type.command';
import { PublishApartmentAdByTypeCommand } from 'src/rental-context/domains/apartment-ad/commands/publish-apartment-ad/publish-apartment-ad-by-type.command';

import { LongTermRentTypeormEntity } from './entities/long-term-rent.typeorm-entity';
import { LongTermRentAdminService } from './long-term-rent-admin.service';

@ApiTags('Admin-panel.LongTermRent')
@ApiBearerAuth()
@Crud({
  model: {
    type: LongTermRentTypeormEntity,
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
@Controller('admin-panel/long-term-rents')
export class LongTermRentAdminController implements CrudController<LongTermRentTypeormEntity> {
  constructor(public service: LongTermRentAdminService, private commandBus: CommandBus) {}

  get base(): CrudController<LongTermRentTypeormEntity> {
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
      return data.map<LongTermRentTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
        ownershipDocuments: i.ownershipDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      }));
    }

    return {
      ...data,
      data: data.data.map<LongTermRentTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
        ownershipDocuments: i.ownershipDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      })),
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/pause')
  @ApiOperation({
    summary: 'Pause long term rent period apartment ad',
  })
  async pause(@Param('id', new ParseUUIDPipe()) apartmentId: string) {
    const resp = await this.commandBus.execute<PauseApartmentAdByTypeCommand, Result<UUID, HttpException>>(
      new PauseApartmentAdByTypeCommand(apartmentId, ApartmentRentPeriodType.LONG_TERM),
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
  @Patch(':id/publish')
  @ApiOperation({
    summary: 'Publish long term rent period apartment ad',
  })
  async publish(@Param('id', new ParseUUIDPipe()) apartmentId: string) {
    const resp = await this.commandBus.execute<PublishApartmentAdByTypeCommand, Result<UUID, HttpException>>(
      new PublishApartmentAdByTypeCommand(apartmentId, ApartmentRentPeriodType.LONG_TERM),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.unwrap().value;
  }
}
