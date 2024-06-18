import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { FindMyCardRequest } from './find-my-card.request';
export declare class FindMyCardService {
    handle(dto: FindMyCardRequest, userId: UserOrmEntity['id']): Promise<Result<InnopayCardOrmEntity, HttpException>>;
}
