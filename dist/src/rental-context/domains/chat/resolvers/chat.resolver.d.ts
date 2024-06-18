import { ApartmentAdMediaModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-media.model';
import { ContractChatModel } from '@domains/contract/models/contract.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import DataLoader from 'dataloader';
import { MessageModel } from 'src/rental-context/domains/message/models/message.model';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';
import { ChatModel } from '../models/chat.model';
import { ApartmentAdIdsModel } from '../models/sub-models/apartment-ad-ids.model';
export declare class ChatGraphqlResolver {
    members(chat: ChatModel, chatMemberLoader: DataLoader<string, UserOrmEntity[]>): Promise<UserModel[] | undefined>;
    apartmentAdPhotos(chat: ChatModel, chatApartmentAdLoader: DataLoader<string, ApartmentAdOrmEntity | undefined>): Promise<ApartmentAdMediaModel[]>;
    lastMessage(chat: ChatModel, chatMemberLoader: DataLoader<string, MessageOrmEntity | undefined>): Promise<MessageModel | undefined>;
    contract(chat: ChatModel, contractLoader: DataLoader<string, ContractOrmEntity | undefined>): Promise<ContractChatModel | undefined>;
    unreadMessageCount(iam: UserOrmEntity, chat: ChatModel, unreadMessageCountLoader: DataLoader<string, number | undefined>): Promise<number | undefined>;
    isActive(chat: ChatModel, isActiveChatLoader: DataLoader<string, boolean | undefined>): Promise<boolean>;
    apartmentAdIds(chat: ChatModel, chatApartmentAdLoader: DataLoader<string, ApartmentAdOrmEntity | undefined>): Promise<ApartmentAdIdsModel>;
}
