import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { toMinorUnit } from '@libs/utils/minimal-unit.helper';
import { TokenType } from '@modules/auth/types';
import { Controller, HttpException, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Result } from 'oxide.ts';
import { PauseApartmentAdByTypeCommand } from 'src/rental-context/domains/apartment-ad/commands/pause-apartment-ad/pause-apartment-ad-by-type.command';
import { PublishApartmentAdByTypeCommand } from 'src/rental-context/domains/apartment-ad/commands/publish-apartment-ad/publish-apartment-ad-by-type.command';

import { ShortTermRentTypeormEntity } from './entities/short-term-rent.typeorm-entity';
import { ShortTermRentAdminService } from './short-term-rent-admin.service';

@ApiTags('Admin-panel.ShortTermRent')
@ApiBearerAuth()
@Crud({
  model: {
    type: ShortTermRentTypeormEntity,
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
@Controller('admin-panel/short-term-rents')
export class ShortTermRentAdminController implements CrudController<ShortTermRentTypeormEntity> {
  constructor(public service: ShortTermRentAdminService, private commandBus: CommandBus) {}

  get base(): CrudController<ShortTermRentTypeormEntity> {
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
    };
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest) {
    const data = await this.base.getManyBase?.(req);

    if (!data) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map<ShortTermRentTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
      }));
    }

    return {
      ...data,
      data: data.data.map<ShortTermRentTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
      })),
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/pause')
  @ApiOperation({
    summary: 'Pause short term rent period apartment ad',
  })
  async pause(@Param('id', new ParseUUIDPipe()) apartmentId: string) {
    const resp = await this.commandBus.execute<PauseApartmentAdByTypeCommand, Result<UUID, HttpException>>(
      new PauseApartmentAdByTypeCommand(apartmentId, ApartmentRentPeriodType.SHORT_TERM),
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
    summary: 'Publish short term rent period apartment ad',
  })
  async publish(@Param('id', new ParseUUIDPipe()) apartmentId: string) {
    const resp = await this.commandBus.execute<PublishApartmentAdByTypeCommand, Result<UUID, HttpException>>(
      new PublishApartmentAdByTypeCommand(apartmentId, ApartmentRentPeriodType.SHORT_TERM),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.unwrap().value;
  }
}
