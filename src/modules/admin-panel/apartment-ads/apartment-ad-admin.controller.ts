import { AdminDeleteApartmentIdentificatorCommand } from '@domains/apartment-ad/commands/admins/admin-delete-apartment-identificator/admin-delete-apartment-identificator.command';
import { AdminEditApartmentAdDescriptionCommand } from '@domains/apartment-ad/commands/admins/admin-edit-apartment-ad-description/admin-edit-apartment-ad-description.command';
import { AdminEditApartmentAdMetatagCommand } from '@domains/apartment-ad/commands/admins/admin-edit-apartment-ad-meta-tag/admin-edit-apartment-ad-meta-tag.command';
import { AdminGetApartmentAdMetatagCommand } from '@domains/apartment-ad/commands/admins/admin-get-apartment-ad-meta-tag/admin-get-apartment-ad-meta-tag.command';
import { ApartmentSlugUpdateCommand } from '@domains/apartment-ad/cron/commands/apartment-slug-update.command';
import { ApartmentsTitleUpdateCommand } from '@domains/apartment-ad/cron/commands/apartments-titles-update.command';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { toMinorUnit } from '@libs/utils/minimal-unit.helper';
import { TokenType } from '@modules/auth/types';
import { Body, Controller, Delete, Get, HttpException, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Result } from 'oxide.ts';

import { prependDomainUrlToFileKey } from '../../../libs/utils/file-key.helper';
import { AdminDeleteApartmentAdCommand } from '../../../rental-context/domains/apartment-ad/commands/admins/admin-delete-apartment-ad/admin-delete-apartment-ad.command';
import { ApartmentAdAdminService } from './apartment-ad-admin.service';
import { EditApartmentAdDescriptionDto } from './dtos/edit-apartment-ad-description.dto';
import { EditApartmentAdMetatagDto } from './dtos/edit-apartment-ad-metatag.dto';
import { ApartmentAdTypeormEntity } from './entities/apartment-ad.typeorm-entity';

@ApiTags('Admin-panel.ApartmentAd')
@ApiBearerAuth()
@Crud({
  model: {
    type: ApartmentAdTypeormEntity,
  },

  query: {
    alwaysPaginate: true,
    join: {
      shortTermRent: {
        eager: true,
      },
      longTermRent: {
        eager: true,
      },
    },
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
@Controller('admin-panel/apartment-ad')
export class ApartmentAdAdminController implements CrudController<ApartmentAdTypeormEntity> {
  constructor(public service: ApartmentAdAdminService, private commandBus: CommandBus) {}

  get base(): CrudController<ApartmentAdTypeormEntity> {
    return this;
  }

  @Override('getOneBase')
  async getOne(@ParsedRequest() req: CrudRequest) {
    const data = await this.base.getOneBase?.(req);

    if (!data) {
      return data;
    }

    const shortTermRent = data.shortTermRent
      ? {
          ...data.shortTermRent,
          cost: toMinorUnit(data.shortTermRent.cost),
        }
      : undefined;

    const longTermRent = data.longTermRent
      ? {
          ...data.longTermRent,
          cost: toMinorUnit(data.longTermRent.cost),
        }
      : undefined;

    return {
      ...data,
      shortTermRent,
      longTermRent,
      media: {
        photos: data.media?.photos.map((photo) => {
          return {
            order: photo.order,
            fileKey: prependDomainUrlToFileKey(photo.fileKey),
          };
        }),
        videos: data.media?.videos.map((video) => {
          return {
            order: video.order,
            fileKey: prependDomainUrlToFileKey(video.fileKey),
          };
        }),
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
      return data.map<ApartmentAdTypeormEntity>((i) => {
        const shortTermRent = i.shortTermRent
          ? {
              ...i.shortTermRent,
              cost: toMinorUnit(i.shortTermRent.cost),
            }
          : undefined;

        const longTermRent = i.longTermRent
          ? {
              ...i.longTermRent,
              cost: toMinorUnit(i.longTermRent.cost),
            }
          : undefined;

        return {
          ...i,
          longTermRent,
          shortTermRent,
          media: {
            photos: (i.media?.photos || []).map((photo) => {
              return {
                order: photo.order,
                fileKey: prependDomainUrlToFileKey(photo.fileKey),
              };
            }),

            videos: (i.media?.videos || []).map((video) => {
              return {
                order: video.order,
                fileKey: prependDomainUrlToFileKey(video.fileKey),
              };
            }),
          },
        };
      });
    }

    return {
      ...data,
      data: data.data.map<ApartmentAdTypeormEntity>((i) => {
        const shortTermRent = i.shortTermRent
          ? {
              ...i.shortTermRent,
              cost: toMinorUnit(i.shortTermRent.cost),
            }
          : undefined;

        const longTermRent = i.longTermRent
          ? {
              ...i.longTermRent,
              cost: toMinorUnit(i.longTermRent.cost),
            }
          : undefined;

        return {
          ...i,
          shortTermRent,
          longTermRent,
          media: {
            photos: (i.media?.photos || []).map((photo) => {
              return {
                order: photo.order,
                fileKey: prependDomainUrlToFileKey(photo.fileKey),
              };
            }),
            videos: (i.media?.videos || []).map((video) => {
              return {
                order: video.order,
                fileKey: prependDomainUrlToFileKey(video.fileKey),
              };
            }),
          },
        };
      }),
    };
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/edit-apartment-ad-description')
  @ApiBody({ type: EditApartmentAdDescriptionDto })
  @ApiOperation({
    summary: 'Edit apartment ad description',
  })
  async editDescription(
    @Param('id', new ParseUUIDPipe()) apartmentId: string,
    @Body() dto: EditApartmentAdDescriptionDto,
  ) {
    const { name, descriptionText } = dto;

    const resp = await this.commandBus.execute<AdminEditApartmentAdDescriptionCommand, Result<UUID, HttpException>>(
      new AdminEditApartmentAdDescriptionCommand(apartmentId, name, descriptionText),
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
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete apartment ad',
  })
  async deleteApartmentAd(@Param('id', new ParseUUIDPipe()) apartmentId: string) {
    const resp = await this.commandBus.execute<AdminDeleteApartmentAdCommand, Result<ApartmentAdEntity, HttpException>>(
      new AdminDeleteApartmentAdCommand(apartmentId),
    );

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    const deleteApIdentificator = await this.commandBus.execute<
      AdminDeleteApartmentIdentificatorCommand,
      Result<ApartmentAdIdentificatorEntity, HttpException>
    >(new AdminDeleteApartmentIdentificatorCommand(apartmentId));

    if (deleteApIdentificator.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.isOk();
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/edit-apartment-ad-metatags')
  @ApiBody({ type: EditApartmentAdMetatagDto })
  @ApiOperation({
    summary: 'Edit apartment ad metatags',
  })
  async editMetaTags(@Param('id', new ParseUUIDPipe()) apartmentId: string, @Body() dto: EditApartmentAdMetatagDto) {
    const { h1, title, description } = dto;

    const resp = await this.commandBus.execute<AdminEditApartmentAdMetatagCommand, Result<UUID, HttpException>>(
      new AdminEditApartmentAdMetatagCommand(apartmentId, h1, title, description),
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
  @Get(':id/get-apartment-ad-metatags')
  @ApiOperation({
    summary: 'Get apartment ad metatags',
  })
  async getMetaTags(@Param('id', new ParseUUIDPipe()) apartmentId: string) {
    const resp = await this.commandBus.execute<
      AdminGetApartmentAdMetatagCommand,
      Result<ApartmentAdIdentificatorEntity, HttpException>
    >(new AdminGetApartmentAdMetatagCommand(apartmentId));

    if (resp.isErr()) {
      throw resp.unwrapErr();
    }

    return resp.unwrap();
  }

  @ApiParam({
    name: 'id',
    type: String,
  })
  @Patch(':id/update-slug')
  @ApiOperation({
    summary: 'Update apartment slug',
  })
  public async updateSlug(@Param('id', new ParseUUIDPipe()) apartmentId: string) {
    await this.commandBus.execute<ApartmentSlugUpdateCommand>(new ApartmentSlugUpdateCommand(apartmentId));
    return true;
  }

  @Patch('/update-titles')
  public async updateTitles() {
    await this.commandBus.execute<ApartmentsTitleUpdateCommand>(new ApartmentsTitleUpdateCommand());
    return true;
  }
}
