import { JwtAuthGuard } from '@infrastructure/guards';
import { getCfSignedUrl } from '@libs/utils/get-cf-signed-url';
import { toMinorUnit } from '@libs/utils/minimal-unit.helper';
import { TokenType } from '@modules/auth/types';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';

import { prependDomainUrlToFileKey } from '../../../libs/utils/file-key.helper';
import { MessageTypeormEntity } from './entities/message.typeorm-entity';
import { MessagesAdminService } from './messages-admin.service';

@ApiTags('Admin-panel.Messages')
@ApiBearerAuth()
@Crud({
  model: {
    type: MessageTypeormEntity,
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
@Controller('admin-panel/messages')
export class MessagesAdminController implements CrudController<MessageTypeormEntity> {
  constructor(public service: MessagesAdminService) {}

  get base(): CrudController<MessageTypeormEntity> {
    return this;
  }

  @Override('getOneBase')
  async getOne(@ParsedRequest() req: CrudRequest) {
    const data = await this.base.getOneBase?.(req);

    if (!data) {
      return data;
    }

    const contractData = data.contractData
      ? { ...data.contractData, cost: data.contractData.cost ? toMinorUnit(data.contractData.cost) : undefined }
      : undefined;

    return {
      ...data,
      contractData,
      fileKey: data?.fileKey ? getCfSignedUrl(prependDomainUrlToFileKey(data.fileKey, 'private')) : undefined,
    };
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest) {
    const data = await this.base.getManyBase?.(req);

    if (!data) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map<MessageTypeormEntity>((i) => {
        const contractData = i.contractData
          ? { ...i.contractData, cost: i.contractData.cost ? toMinorUnit(i.contractData.cost) : undefined }
          : undefined;

        return {
          ...i,
          contractData,
          fileKey: i?.fileKey ? getCfSignedUrl(prependDomainUrlToFileKey(i.fileKey, 'private')) : undefined,
        };
      });
    }

    return {
      ...data,
      data: data.data.map<MessageTypeormEntity>((i) => {
        const contractData = i.contractData
          ? { ...i.contractData, cost: i.contractData.cost ? toMinorUnit(i.contractData.cost) : undefined }
          : undefined;

        return {
          ...i,
          contractData,
          fileKey: i?.fileKey ? getCfSignedUrl(prependDomainUrlToFileKey(i.fileKey, 'private')) : undefined,
        };
      }),
    };
  }
}
