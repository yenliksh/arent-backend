import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { TokenType } from '@modules/auth/types';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminsSignInBodyDto } from '../dtos';
import { AdminTypeormEntity } from '../entities/admins.typeorm-entity';
import { AdminsAuthService } from '../services';

@ApiTags('Admins')
@Controller('admin-panel')
export class AdminsAuthController {
  constructor(private readonly adminService: AdminsAuthService) {}

  @Post('sign-in')
  @ApiOperation({
    summary: 'Get me',
  })
  @ApiBody({ type: AdminsSignInBodyDto })
  async signIn(@Body() input: AdminsSignInBodyDto) {
    return this.adminService.signIn(input);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get me',
  })
  @UseGuards(JwtAuthGuard(TokenType.ADMIN))
  async getMe(@IAM() admin: AdminTypeormEntity): Promise<AdminTypeormEntity> {
    return admin;
  }
}
