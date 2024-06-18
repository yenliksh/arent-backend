import { UndefinedReturnGoogleOauthProblem } from '@domains/user/problems/undefined-return-google-oauth.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { AuthNService } from '@modules/auth/services/authn.service';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { SignInByGoogleRequest } from './sign-in-by-google.request.dto';
declare type GoogleSignResult = {
    token: string;
    userId?: UUID;
    refreshToken?: string;
};
export declare class SignInByGoogleService {
    private readonly authService;
    private readonly configService;
    private readonly userRepository;
    private eventEmitter;
    private readonly oauthClient;
    constructor(authService: AuthNService, configService: ConfigService, userRepository: UserRepository, eventEmitter: EventEmitter2);
    handle(dto: SignInByGoogleRequest): Promise<Result<GoogleSignResult, UndefinedReturnGoogleOauthProblem>>;
    private getUserData;
}
export {};
