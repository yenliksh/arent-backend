import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { Ok } from 'oxide.ts';
export declare class LandlordActiveRentContractsService {
    handle(userId: UserOrmEntity['id']): Promise<Ok<ContractOrmEntity[]>>;
    private findActiveRentContracts;
}
