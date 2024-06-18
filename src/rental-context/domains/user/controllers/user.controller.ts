import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtRefreshAuthGuard } from '@infrastructure/guards';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { RefreshTokenResponse } from '../commands/refresh-token/refresh-token.response.dto';
import { RefreshTokenService } from '../commands/refresh-token/refresh-token.service';

@ApiBearerAuth()
@ApiTags('Webhook. Users')
@Controller('v1/user')
export class UserController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh-token')
  @ApiCreatedResponse({
    type: RefreshTokenResponse,
  })
  public async refreshToken(
    @IAM('id')
    userId: UserOrmEntity['id'],
  ): Promise<RefreshTokenResponse> {
    const result = await this.refreshTokenService.handle(userId);

    return RefreshTokenResponse.create(result.unwrap());
  }
}
