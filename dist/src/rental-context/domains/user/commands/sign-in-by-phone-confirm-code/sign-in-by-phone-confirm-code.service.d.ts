import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { AuthNService } from '@modules/auth/services/authn.service';
import { CloudCacheStorageService } from '@third-parties/cloud-cache-storage/src';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { InvalidVerificationPhoneCodeProblem } from 'src/rental-context/domains/user/problems/invalid-verification-phone-code.problem';
import { SignInByPhoneConfirmCodeRequest } from './sign-in-by-phone-confirm-code.request.dto';
declare type ConfirmCodeResult = {
    token: string;
    userId?: UUID;
    refreshToken?: string;
};
export declare class SignInByPhoneConfirmCodeService {
    private readonly authService;
    private readonly cacheStorageService;
    private readonly userRepository;
    constructor(authService: AuthNService, cacheStorageService: CloudCacheStorageService, userRepository: UserRepository);
    handle(dto: SignInByPhoneConfirmCodeRequest): Promise<Result<ConfirmCodeResult, InvalidVerificationPhoneCodeProblem>>;
    private getSMScode;
    private deleteSMScode;
}
export {};
