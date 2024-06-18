import * as crypto from 'crypto';

import { UnauthorizedException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { AdminTypeormEntity } from '../entities/admins.typeorm-entity';

@EntityRepository(AdminTypeormEntity)
export class AdminsTypeormRepository extends Repository<AdminTypeormEntity> {
  async findByCredentialsOrFail(login: string, password: string): Promise<AdminTypeormEntity> {
    const admin = await this.createQueryBuilder(AdminTypeormEntity.tableName)
      .where(`${AdminTypeormEntity.tableName}.login = :login`, {
        login,
      })
      .andWhere(`${AdminTypeormEntity.tableName}.password = :password`, {
        password: crypto.createHmac('sha256', password).digest('hex'),
      })
      .getOne();

    if (!admin) {
      throw new UnauthorizedException('Invalid login or password');
    }

    return admin;
  }
}
