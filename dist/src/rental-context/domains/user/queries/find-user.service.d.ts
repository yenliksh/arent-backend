import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
export declare class FindUserService {
    handle(userId: UserOrmEntity['id']): Promise<Result<UserOrmEntity, HttpException>>;
}
