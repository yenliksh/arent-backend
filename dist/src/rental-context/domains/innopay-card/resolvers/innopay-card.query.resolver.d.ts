import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { InnopayCardModel } from '../models/innopay-card.model';
import { FindMyCardsRequest } from '../queries/find-my-cards/find-my-cards.request';
import { FindMyCardsService } from '../queries/find-my-cards/find-my-cards.service';
import { TenantContractCardRequest } from '../queries/tenant-contract-card/tenant-contract-card.request';
import { TenantContractCardService } from '../queries/tenant-contract-card/tenant-contract-card.service';
export declare class InnopayCardQueryGraphqlResolver {
    private readonly findMyCardsService;
    private readonly tenantContractCardService;
    constructor(findMyCardsService: FindMyCardsService, tenantContractCardService: TenantContractCardService);
    getMyCards(iam: UserOrmEntity, input?: FindMyCardsRequest): Promise<InnopayCardModel[]>;
    tenantContractCard(userId: UserOrmEntity['id'], input: TenantContractCardRequest): Promise<InnopayCardModel>;
}
