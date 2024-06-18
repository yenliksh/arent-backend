import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { TenantContractCardRequest } from './tenant-contract-card.request';
export declare class TenantContractCardService {
    handle(dto: TenantContractCardRequest, userId: UserOrmEntity['id']): Promise<any>;
}
