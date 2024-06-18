import { AdminProfileEditBirthdateCommand } from '@domains/user/commands/admins/admin-profile-edit-birthdate/admin-profile-edit-birthdate.command';
import { AdminProfileEditGenderCommand } from '@domains/user/commands/admins/admin-profile-edit-gender/admin-profile-edit-gender.command';
import { AdminProfileEditGuarantorCommand } from '@domains/user/commands/admins/admin-profile-edit-guarantor/admin-profile-edit-guarantor.command';
import { AdminProfileEditNameCommand } from '@domains/user/commands/admins/admin-profile-edit-name/admin-profile-edit-name.command';
import { UserEntity } from '@domains/user/domain/entities/user.entity';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { prependDomainUrlToFileKey } from '@libs/utils/file-key.helper';
import { getCfSignedUrl } from '@libs/utils/get-cf-signed-url';
import { AdminPanelHeaderInterceptor } from '@modules/admin-panel/common/interceptors/admin-panel-header.interceptor';
import { TokenType } from '@modules/auth/types';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  Param,
  ParseUUIDPipe,
  Patch,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Result } from 'oxide.ts';

import { AdminProfileDeleteCommand } from '../../../rental-context/domains/user/commands/admins/admin-profile-delete/admin-profile-delete.command';
import { AdminProfileEditUserInfoDto } from './dtos/admin-profile-edit.dto';
import { UserTypeormEntity } from './entities/user.typeorm-entity';
import { UsersAdminService } from './users-admin.service';

@ApiTags('Admin-panel.Users')
@ApiBearerAuth()
@Crud({
  model: {
    type: UserTypeormEntity,
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
@Controller('admin-panel/users')
export class UsersAdminController implements CrudController<UserTypeormEntity> {
  constructor(public service: UsersAdminService, private commandBus: CommandBus) {}

  get base(): CrudController<UserTypeormEntity> {
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
      return data.map<UserTypeormEntity>((i) => ({
        ...i,
        avatarKey: i?.avatarKey ? prependDomainUrlToFileKey(i?.avatarKey) : undefined,
        identityDocuments: i.identityDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      }));
    }

    return {
      ...data,
      data: data.data.map<UserTypeormEntity>((i) => ({
        ...i,
        avatarKey: i?.avatarKey ? prependDomainUrlToFileKey(i?.avatarKey) : undefined,
        identityDocuments: i.identityDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      })),
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id')
  @ApiBody({ type: AdminProfileEditUserInfoDto })
  @ApiOperation({
    summary: 'Edit users info',
  })
  async editUserInfo(@Param('id', new ParseUUIDPipe()) userId: string, @Body() dto: AdminProfileEditUserInfoDto) {
    const { userName, birthdate, gender, guarantor } = dto;

    let resp: Result<UUID, HttpException> | undefined;

    if (userName && userName.firstName && userName.lastName) {
      const { firstName, lastName, middleName } = userName;

      resp = await this.commandBus.execute<AdminProfileEditNameCommand, Result<UUID, HttpException>>(
        new AdminProfileEditNameCommand(userId, firstName, lastName, middleName),
      );

      if (resp.isErr()) {
        throw resp.unwrapErr();
      }
    }

    if (birthdate) {
      resp = await this.commandBus.execute<AdminProfileEditBirthdateCommand, Result<UUID, HttpException>>(
        new AdminProfileEditBirthdateCommand(userId, birthdate),
      );

      if (resp.isErr()) {
        throw resp.unwrapErr();
      }
    }

    if (gender) {
      resp = await this.commandBus.execute<AdminProfileEditGenderCommand, Result<UUID, HttpException>>(
        new AdminProfileEditGenderCommand(userId, gender),
      );

      if (resp.isErr()) {
        throw resp.unwrapErr();
      }
    }

    if (guarantor && guarantor.firstName && guarantor.lastName && guarantor.phone) {
      const { firstName, lastName, phone } = guarantor;

      resp = await this.commandBus.execute<AdminProfileEditGuarantorCommand, Result<UUID, HttpException>>(
        new AdminProfileEditGuarantorCommand(userId, firstName, lastName, phone),
      );

      if (resp.isErr()) {
        throw resp.unwrapErr();
      }
    }

    if (!resp) {
      throw new UnprocessableEntityException('The request body must contain at least one filled field');
    }

    return resp.unwrap().value;
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
  })
  async deleteUser(@Param('id', new ParseUUIDPipe()) userId: string) {
    const resp = await this.commandBus.execute<AdminProfileDeleteCommand, Result<UserEntity, HttpException>>(
      new AdminProfileDeleteCommand(userId),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.isOk();
  }
}
