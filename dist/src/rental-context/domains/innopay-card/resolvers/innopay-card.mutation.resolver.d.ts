import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { DeleteCardRequest } from '../commands/delete-card/delete-card.request.dto';
import { DeleteCardService } from '../commands/delete-card/delete-card.service';
import { SaveCardStartService } from '../commands/save-card-start/save-card-start.service';
import { InnopayCardResponse } from '../dtos/innopay-card.response.dto';
import { SaveCardStartResponse } from '../dtos/save-card-start.response.dto';
export declare class InnopayCardMutationGraphqlResolver {
    private readonly saveCardStartService;
    private readonly deleteCardService;
    constructor(saveCardStartService: SaveCardStartService, deleteCardService: DeleteCardService);
    saveCardStart(iam: UserOrmEntity): Promise<SaveCardStartResponse>;
    deleteCard(iam: UserOrmEntity, input: DeleteCardRequest): Promise<InnopayCardResponse>;
}
