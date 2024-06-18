import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { FindMyCardsRequest } from './find-my-cards.request';
export declare class FindMyCardsService {
    handle(userId: UserOrmEntity['id'], input?: FindMyCardsRequest): Promise<Result<InnopayCardOrmEntity[], HttpException>>;
}
