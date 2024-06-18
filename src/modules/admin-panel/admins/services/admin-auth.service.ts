import { AuthNService } from '@modules/auth/services/authn.service';
import { TokenType } from '@modules/auth/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthAdmin } from '../admins.types';
import { AdminsSignInBodyDto } from '../dtos';
import { AdminsTypeormRepository } from '../repositories';

@Injectable()
export class AdminsAuthService {
  constructor(
    private readonly authService: AuthNService,
    @InjectRepository(AdminsTypeormRepository)
    private readonly adminsRepository: AdminsTypeormRepository,
  ) {}

  async signIn(input: AdminsSignInBodyDto): Promise<AuthAdmin> {
    const admin = await this.adminsRepository.findByCredentialsOrFail(input.login, input.password);

    let token: string;

    try {
      token = await this.authService.createToken(TokenType.ADMIN, { id: admin.id });
    } catch (error) {
      throw new HttpException('Something went wrong, try again later', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      admin,
      token,
    } as AuthAdmin;
  }
}
