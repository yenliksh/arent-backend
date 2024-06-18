import { AuthNService } from '@modules/auth/services/authn.service';
import { AuthAdmin } from '../admins.types';
import { AdminsSignInBodyDto } from '../dtos';
import { AdminsTypeormRepository } from '../repositories';
export declare class AdminsAuthService {
    private readonly authService;
    private readonly adminsRepository;
    constructor(authService: AuthNService, adminsRepository: AdminsTypeormRepository);
    signIn(input: AdminsSignInBodyDto): Promise<AuthAdmin>;
}
