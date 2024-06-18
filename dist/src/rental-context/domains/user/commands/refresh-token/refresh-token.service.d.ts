import { UserRepository } from '@domain-repositories/user/user.repository';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { AuthNService } from '@modules/auth/services/authn.service';
import { Ok } from 'oxide.ts';
export declare type RefreshTokenResult = {
    token: string;
    userId?: UUID;
    refreshToken?: string;
};
export declare class RefreshTokenService {
    private readonly authService;
    private readonly userRepository;
    constructor(authService: AuthNService, userRepository: UserRepository);
    handle(userId: UserOrmEntity['id']): Promise<Ok<RefreshTokenResult>>;
}
