import { ApartmentAdMediaModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-media.model';
import { ContractChatModel } from '@domains/contract/models/contract.model';
import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { FieldFromResolver } from '@infrastructure/decorators/field-from-resolver.decorator';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MessageModel } from 'src/rental-context/domains/message/models/message.model';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';

import { ApartmentAdIdsModel } from './sub-models/apartment-ad-ids.model';

@ObjectType()
export class ChatModel extends ModelBase {
  constructor(chat: ChatOrmEntity) {
    super(chat);
  }

  @Field(() => String)
  contractId: string;

  @Field(() => String, { nullable: true })
  lastOfferMessageId?: string;

  @FieldFromResolver(() => [UserModel])
  members: UserModel[];

  @FieldFromResolver(() => ContractChatModel)
  contract?: ContractChatModel;

  @FieldFromResolver(() => [ApartmentAdMediaModel], { nullable: true })
  apartmentAdPhotos?: ApartmentAdMediaModel[];

  @FieldFromResolver(() => MessageModel, { nullable: true })
  lastMessage?: MessageModel;

  @FieldFromResolver(() => Int)
  unreadMessageCount: number;

  @FieldFromResolver(() => Boolean)
  isActive: boolean;

  @FieldFromResolver(() => ApartmentAdIdsModel)
  apartmentAdIds: ApartmentAdIdsModel;

  static create(props: ChatOrmEntity) {
    const payload = new ChatModel(props);

    payload.contractId = props.contractId;
    payload.lastOfferMessageId = props.lastOfferMessageId;

    return payload;
  }
}
