import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { prependDomainUrlToFileKey } from '@libs/utils/file-key.helper';
import { getCfSignedUrl } from '@libs/utils/get-cf-signed-url';
import { AdminPanelHeaderInterceptor } from '@modules/admin-panel/common/interceptors/admin-panel-header.interceptor';
import { TokenType } from '@modules/auth/types';
import { Body, Controller, HttpException, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Result } from 'oxide.ts';
import { ProfileIdentityApproveCommand } from 'src/rental-context/domains/user/commands/profile-identity-approve/profile-identity-approve.command';
import { ProfileIdentityRejectCommand } from 'src/rental-context/domains/user/commands/profile-identity-reject/profile-identity-reject.command';

import { UserIdentityRejectDto } from './dtos';
import { UserIdentityRequestTypeormEntity } from './entities/user-identity-request.typeorm-entity';
import { UserIdentityRequestsAdminService } from './user-identity-requests-admin.service';

@ApiTags('Admin-panel.UserIdentityRequests')
@ApiBearerAuth()
@Crud({
  model: {
    type: UserIdentityRequestTypeormEntity,
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
@Controller('admin-panel/user-identity-requests')
export class UserIdentityRequestsAdminController implements CrudController<UserIdentityRequestTypeormEntity> {
  constructor(public service: UserIdentityRequestsAdminService, private commandBus: CommandBus) {}

  get base(): CrudController<UserIdentityRequestTypeormEntity> {
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
      avatarKey: data?.avatarKey ? prependDomainUrlToFileKey(data.avatarKey) : undefined,
      identityDocuments: data.identityDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
    };
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest) {
    const data = await this.base.getManyBase?.(req);

    if (!data) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map<UserIdentityRequestTypeormEntity>((i) => ({
        ...i,
        avatarKey: i?.avatarKey ? prependDomainUrlToFileKey(i?.avatarKey) : undefined,
        identityDocuments: i.identityDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      }));
    }

    return {
      ...data,
      data: data.data.map<UserIdentityRequestTypeormEntity>((i) => ({
        ...i,
        avatarKey: i?.avatarKey ? prependDomainUrlToFileKey(i?.avatarKey) : undefined,
        identityDocuments: i.identityDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      })),
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'user id',
  })
  @Patch(':id/approve')
  @ApiOperation({
    summary: 'Approve user identity',
  })
  async approve(@Param('id', new ParseUUIDPipe()) userId: string) {
    const resp = await this.commandBus.execute<ProfileIdentityApproveCommand, Result<UUID, HttpException>>(
      new ProfileIdentityApproveCommand(userId),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.isOk();
  }

  @ApiParam({
    name: 'id',
    type: String,
    description: 'user id',
  })
  @Patch(':id/reject')
  @ApiOperation({
    summary: 'Reject user identity',
  })
  async reject(@Param('id', new ParseUUIDPipe()) userId: string, @Body() dto: UserIdentityRejectDto) {
    const { rejectReason } = dto;

    const resp = await this.commandBus.execute<ProfileIdentityRejectCommand, Result<UUID, HttpException>>(
      new ProfileIdentityRejectCommand(userId, rejectReason),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.isOk();
  }
}
