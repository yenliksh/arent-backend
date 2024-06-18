import { FindApartmentMetatagsCommand } from '@domains/apartment-ad/commands/find-apartment-metatags/find-apartment-metatags.command';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdIdentificatorTypeormEntity } from '@modules/admin-panel/apartment-ad-identificator/entities/apartment-ad-identificator.typeorm-entity';
import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CrudController } from '@nestjsx/crud';
import { Result } from 'oxide.ts';

import { ApartmentIdentificatorService } from './apartment-identificator.service';

@ApiTags('User-panel.ApartmentIdentificator')
@Controller('v1/user-panel/apartment-identificator')
export class ApartmentIdentificatorController implements CrudController<ApartmentAdIdentificatorTypeormEntity> {
  constructor(public service: ApartmentIdentificatorService, private commandBus: CommandBus) {}

  get base(): CrudController<ApartmentAdIdentificatorTypeormEntity> {
    return this;
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Get(':id/find')
  @ApiOperation({
    summary: 'Find apartment ad identificator',
  })
  async getApartmentIdentificator(@Param('id') id: string) {
    const resp = await this.commandBus.execute<
      FindApartmentMetatagsCommand,
      Result<ApartmentAdIdentificatorEntity, HttpException>
    >(new FindApartmentMetatagsCommand(id));

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.unwrap();
  }
}
