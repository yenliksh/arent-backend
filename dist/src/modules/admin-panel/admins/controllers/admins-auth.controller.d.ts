import { AdminsSignInBodyDto } from '../dtos';
import { AdminTypeormEntity } from '../entities/admins.typeorm-entity';
import { AdminsAuthService } from '../services';
export declare class AdminsAuthController {
    private readonly adminService;
    constructor(adminService: AdminsAuthService);
    signIn(input: AdminsSignInBodyDto): Promise<import("../admins.types").AuthAdmin>;
    getMe(admin: AdminTypeormEntity): Promise<AdminTypeormEntity>;
}
