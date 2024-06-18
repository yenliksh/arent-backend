import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { AdminTypeormEntity } from '@modules/admin-panel/admins/entities';
import { AdminsTypeormRepository } from '@modules/admin-panel/admins/repositories';
import { StrategyPayload } from '../types';
export declare class AuthZService {
    private readonly adminsTypeormRepository;
    constructor(adminsTypeormRepository: AdminsTypeormRepository);
    validateUser(payload: StrategyPayload): Promise<UserOrmEntity>;
    validateAdmin(payload: StrategyPayload): Promise<AdminTypeormEntity>;
    validate(payload: StrategyPayload): Promise<void>;
}
