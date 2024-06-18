import { UserModel } from '@domains/user/models/user.model';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { FieldFromResolver } from '@infrastructure/decorators/field-from-resolver.decorator';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { prependDomainUrlToFileKey } from '@libs/utils/file-key.helper';
import { getCfSignedUrl } from '@libs/utils/get-cf-signed-url';
import { Field, Float, ObjectType } from '@nestjs/graphql';

import { MessageStatus, MessageType, SystemMessageType } from '../domain/types';
import { SystemMessageDataModel } from './sub-models/system-message-data.model';
import { TransactionMetaModel } from './sub-models/transaction-meta.model';

@ObjectType()
export class MessageModel extends ModelBase {
  constructor(message: MessageOrmEntity) {
    super(message);
  }

  @Field(() => String)
  chatId: string;

  @Field(() => String, { nullable: true })
  senderId?: string;

  @Field(() => MessageType)
  type: MessageType;

  @Field(() => MessageStatus)
  status: MessageStatus;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => String, { nullable: true })
  mediaUrl?: string;

  @Field(() => String, { nullable: true })
  mediaName?: string;

  @Field(() => Float, { nullable: true })
  mediaWeight?: number;

  @Field(() => SystemMessageType, { nullable: true })
  systemMessageType?: SystemMessageType;

  @Field(() => SystemMessageDataModel, { nullable: true })
  contractData?: SystemMessageDataModel;

  @Field(() => [TransactionMetaModel])
  transactionsMeta: TransactionMetaModel[];

  @FieldFromResolver(() => UserModel, { nullable: true })
  sender?: UserModel;

  static create(props: MessageOrmEntity) {
    const payload = new MessageModel(props);

    payload.chatId = props.chatId;
    payload.contractData = props.contractData ? SystemMessageDataModel.create(props.contractData) : undefined;
    payload.mediaUrl = props.fileKey ? getCfSignedUrl(prependDomainUrlToFileKey(props.fileKey, 'private')) : undefined;
    payload.mediaName = props.fileName ?? undefined;
    payload.mediaWeight = props.fileWeight ?? undefined;
    payload.senderId = props.senderId;
    payload.status = props.status;
    payload.systemMessageType = props.systemMessageType ?? undefined;
    payload.transactionsMeta = props.contractData?.transactionsMeta?.length
      ? props.contractData.transactionsMeta.map((i) => TransactionMetaModel.create(i))
      : [];
    payload.text = props.text ?? undefined;
    payload.type = props.type;

    return payload;
  }
}
