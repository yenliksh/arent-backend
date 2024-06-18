import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { RefreshTokenResponse } from '../commands/refresh-token/refresh-token.response.dto';
import { RefreshTokenService } from '../commands/refresh-token/refresh-token.service';
export declare class UserController {
    private readonly refreshTokenService;
    constructor(refreshTokenService: RefreshTokenService);
    refreshToken(userId: UserOrmEntity['id']): Promise<RefreshTokenResponse>;
}
