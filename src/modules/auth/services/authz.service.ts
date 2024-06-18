import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { AdminTypeormEntity } from '@modules/admin-panel/admins/entities';
import { AdminsTypeormRepository } from '@modules/admin-panel/admins/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StrategyPayload, TokenPayloadMap, TokenType } from '../types';

@Injectable()
export class AuthZService {
  constructor(
    @InjectRepository(AdminsTypeormRepository) private readonly adminsTypeormRepository: AdminsTypeormRepository,
  ) {}

  async validateUser(payload: StrategyPayload): Promise<UserOrmEntity> {
    const { id } = payload;

    const user = await UserOrmEntity.query().findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async validateAdmin(payload: StrategyPayload): Promise<AdminTypeormEntity> {
    const { id } = payload;

    // TODO: change to Objection repository
    const admin = await this.adminsTypeormRepository.findOne({ where: { id } });

    if (!admin) {
      throw new UnauthorizedException();
    }

    return admin;
  }

  async validate(payload: StrategyPayload) {
    const tokePayloadMap: TokenPayloadMap = {
      [TokenType.USER]: this.validateUser.bind(this),
      [TokenType.ADMIN]: this.validateAdmin.bind(this),
      [TokenType.REFRESH]: this.validateUser.bind(this),
    };

    return tokePayloadMap[payload.tokenType](payload as any);
  }
}
