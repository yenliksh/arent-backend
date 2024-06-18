import { CancelContractByAdminCommand } from '@domains/contract/commands/cancel-contract-by-admin/cancel-contract-by-admin.command';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { toMinorUnit } from '@libs/utils/minimal-unit.helper';
import { TokenType } from '@modules/auth/types';
import { Body, Controller, HttpException, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Result } from 'oxide.ts';

import { ContractsAdminService } from './contracts-admin.service';
import { ContractCancellationRequest } from './dtos/contract-cancellation.request.dto';
import { ContractTypeormEntity } from './entities/contract.typeorm-entity';

@ApiTags('Admin-panel.Contracts')
@ApiBearerAuth()
@Crud({
  model: {
    type: ContractTypeormEntity,
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
@Controller('admin-panel/contracts')
export class ContractsAdminController implements CrudController<ContractTypeormEntity> {
  constructor(public service: ContractsAdminService, private commandBus: CommandBus) {}

  get base(): CrudController<ContractTypeormEntity> {
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
      return data.map<ContractTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
      }));
    }

    return {
      ...data,
      data: data.data.map<ContractTypeormEntity>((i) => ({
        ...i,
        cost: toMinorUnit(i.cost),
      })),
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOperation({
    summary: 'Cancel active contract',
  })
  @ApiOkResponse({ type: String })
  @ApiBody({ type: ContractCancellationRequest })
  @Post(':id/cancel')
  async cancel(@Body() input: ContractCancellationRequest, @Param('id', new ParseUUIDPipe()) contractId: string) {
    const result = await this.commandBus.execute<CancelContractByAdminCommand, Result<UUID, HttpException>>(
      new CancelContractByAdminCommand({
        contractId: new UUID(contractId),
        trigger: input.requestingUserRole,
        adminCancelMeta: input.cancellationMeta,
      }),
    );

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    const queryResult = await ContractOrmEntity.query().findById(result.unwrap().value);

    return queryResult;
  }
}
