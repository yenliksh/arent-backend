import { ApartmentAdMediaModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-media.model';
import { ContractChatModel } from '@domains/contract/models/contract.model';
import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { MessageModel } from 'src/rental-context/domains/message/models/message.model';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';
import { ApartmentAdIdsModel } from './sub-models/apartment-ad-ids.model';
export declare class ChatModel extends ModelBase {
    constructor(chat: ChatOrmEntity);
    contractId: string;
    lastOfferMessageId?: string;
    members: UserModel[];
    contract?: ContractChatModel;
    apartmentAdPhotos?: ApartmentAdMediaModel[];
    lastMessage?: MessageModel;
    unreadMessageCount: number;
    isActive: boolean;
    apartmentAdIds: ApartmentAdIdsModel;
    static create(props: ChatOrmEntity): ChatModel;
}
