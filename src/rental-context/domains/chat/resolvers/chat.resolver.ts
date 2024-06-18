import { ApartmentAdMediaModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-media.model';
import { ContractChatModel } from '@domains/contract/models/contract.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ContractOrmEntityLoader } from '@infrastructure/dataloader/contract.dataloader';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { Loader } from '@libs/dataloader';
import { encodeBase64 } from '@libs/utils/base64';
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { MessageModel } from 'src/rental-context/domains/message/models/message.model';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';

import { ApartmentAdForContractLoader } from '../dataloader/apartment-ad-for-contract.dataloader';
import { ChatMembersLoader } from '../dataloader/chat-members.dataloader';
import { IsActiveChatLoader } from '../dataloader/is-active-chat.dataloader';
import { LastMessageLoader } from '../dataloader/last-message.dataloader';
import { UnreadMessageCountLoader, UnreadMessageCountLoaderProps } from '../dataloader/unread-message-count.dataloader';
import { ChatModel } from '../models/chat.model';
import { ApartmentAdIdsModel } from '../models/sub-models/apartment-ad-ids.model';

@Resolver(() => ChatModel)
export class ChatGraphqlResolver {
  @ResolveField(() => [UserModel])
  async members(
    @Parent() chat: ChatModel,
    @Loader(ChatMembersLoader.name) chatMemberLoader: DataLoader<string, UserOrmEntity[]>,
  ): Promise<UserModel[] | undefined> {
    const { id, members } = chat;

    if (members) {
      return members;
    }

    const result = await chatMemberLoader.load(id);

    return result.map(UserModel.create);
  }

  @ResolveField(() => [ApartmentAdMediaModel])
  async apartmentAdPhotos(
    @Parent() chat: ChatModel,
    @Loader(ApartmentAdForContractLoader.name)
    chatApartmentAdLoader: DataLoader<string, ApartmentAdOrmEntity | undefined>,
  ): Promise<ApartmentAdMediaModel[]> {
    const { contractId, apartmentAdPhotos } = chat;

    if (apartmentAdPhotos) {
      return apartmentAdPhotos;
    }

    const result = await chatApartmentAdLoader.load(contractId);

    return (result?.media?.photos || []).map(ApartmentAdMediaModel.create);
  }

  @ResolveField(() => MessageModel)
  async lastMessage(
    @Parent() chat: ChatModel,
    @Loader(LastMessageLoader.name) chatMemberLoader: DataLoader<string, MessageOrmEntity | undefined>,
  ): Promise<MessageModel | undefined> {
    const { id, lastMessage } = chat;

    if (lastMessage) {
      return lastMessage;
    }

    const result = await chatMemberLoader.load(id);

    return result ? MessageModel.create(result) : undefined;
  }

  @ResolveField(() => ContractChatModel)
  async contract(
    @Parent() chat: ChatModel,
    @Loader(ContractOrmEntityLoader.name) contractLoader: DataLoader<string, ContractOrmEntity | undefined>,
  ): Promise<ContractChatModel | undefined> {
    const { contractId, contract } = chat;

    if (contract) {
      return contract;
    }

    const result = await contractLoader.load(contractId);

    return result ? ContractChatModel.create(result) : undefined;
  }

  @ResolveField(() => Int)
  async unreadMessageCount(
    @IAM() iam: UserOrmEntity,
    @Parent() chat: ChatModel,
    @Loader(UnreadMessageCountLoader.name) unreadMessageCountLoader: DataLoader<string, number | undefined>,
  ): Promise<number | undefined> {
    const { id } = chat;

    const unreadMessageCountLoaderProps: UnreadMessageCountLoaderProps = {
      chatId: id,
      userId: iam.id,
    };

    const result = await unreadMessageCountLoader.load(encodeBase64(unreadMessageCountLoaderProps));

    return result ?? 0;
  }

  @ResolveField(() => Boolean)
  async isActive(
    @Parent() chat: ChatModel,
    @Loader(IsActiveChatLoader.name) isActiveChatLoader: DataLoader<string, boolean | undefined>,
  ): Promise<boolean> {
    const { contractId, isActive } = chat;

    if (isActive != null) {
      return isActive;
    }

    const result = await isActiveChatLoader.load(contractId);

    return result ?? false;
  }

  @ResolveField(() => ApartmentAdIdsModel)
  async apartmentAdIds(
    @Parent() chat: ChatModel,
    @Loader(ApartmentAdForContractLoader.name)
    chatApartmentAdLoader: DataLoader<string, ApartmentAdOrmEntity | undefined>,
  ): Promise<ApartmentAdIdsModel> {
    const { contractId, apartmentAdIds } = chat;

    if (apartmentAdIds) {
      return apartmentAdIds;
    }

    const result = await chatApartmentAdLoader.load(contractId);

    return ApartmentAdIdsModel.create({
      longTermRentId: result?.longTermRent?.id,
      shortTermRentId: result?.shortTermRent?.id,
    });
  }
}
