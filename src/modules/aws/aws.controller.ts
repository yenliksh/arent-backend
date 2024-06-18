import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { Controller, Delete, Get, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeleteFromS3Dto, GetSignedUrlDto } from './s3/s3.dto';
import { S3Service } from './s3/s3.service';

@Controller('v1/aws')
@ApiTags('S3')
@ApiBearerAuth()
@UsePipes(new ValidationPipe())
export class AwsController {
  constructor(private s3Service: S3Service) {}

  @UseGuards(JwtAuthGuard())
  @ApiOperation({
    summary: 'Get Signed Url',
  })
  @ApiOkResponse({
    type: String,
  })
  @Get('signed-url')
  public async getSignedUrl(@Query() getSignedUrlDto: GetSignedUrlDto, @IAM('id') userId: UserOrmEntity['id']) {
    return this.s3Service.getSignedUrl(userId, getSignedUrlDto);
  }

  @ApiOperation({
    summary: 'Delete From S3',
  })
  @UseGuards(JwtAuthGuard())
  @Delete('delete-s3-file')
  public async deleteFromS3(@Query() deleteFromS3Dto: DeleteFromS3Dto, @IAM('id') userId: UserOrmEntity['id']) {
    return this.s3Service.deleteFromS3(userId, deleteFromS3Dto);
  }
}
