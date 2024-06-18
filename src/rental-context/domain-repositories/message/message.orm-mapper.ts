import { MessageEntity, MessageProps } from '@domains/message/domain/entities/message.entity';
import { MediaMessageVO } from '@domains/message/domain/value-objects/media-message.value-object';
import { SystemMessageVO } from '@domains/message/domain/value-objects/system-message.value-object';
import { TextMessageVO } from '@domains/message/domain/value-objects/text-message.value-object';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
import { DateUtil } from '@libs/utils/date-util';

export class MessageOrmMapper extends OrmMapper<MessageEntity, MessageOrmEntity> {
  protected async toOrmProps(entity: MessageEntity): Promise<OrmEntityProps<MessageOrmEntity>> {
    const props = entity.getPropsCopy();
    const textProps = props.text?.unpack();
    const mediaProps = props.media?.unpack();
    const systemProps = props.system?.unpack();

    const ormProps: OrmEntityProps<MessageOrmEntity> = {
      chatId: props.chatId.value,
      senderId: props.senderId.value,
      type: props.type,
      status: props.status,
      text: textProps?.text ?? null,
      fileKey: mediaProps?.fileKey ?? null,
      fileName: mediaProps?.fileName ?? null,
      fileWeight: mediaProps?.fileWeight ?? null,
      systemMessageType: systemProps?.type ?? null,
      contractData: systemProps
        ? {
            ...systemProps.contractData,
            arrivalDate: systemProps.contractData.arrivalDate?.toISOString(),
            departureDate: systemProps.contractData.departureDate?.toISOString(),
            transactionsMeta: systemProps.contractData.transactionsMeta?.map((meta) => ({
              ...meta,
              endDate: meta.endDate.toISOString(),
              startDate: meta.startDate.toISOString(),
              withdrawFundsDate: meta.withdrawFundsDate.toISOString(),
            })),
          }
        : null,
    };

    return ormProps;
  }

  protected async toDomainProps(ormEntity: MessageOrmEntity): Promise<EntityProps<MessageProps>> {
    const id = new UUID(ormEntity.id);

    const props: MessageProps = {
      chatId: new UUID(ormEntity.chatId),
      senderId: new UUID(ormEntity.senderId),
      type: ormEntity.type,
      status: ormEntity.status,
      text: ormEntity.text ? TextMessageVO.create({ text: ormEntity.text }) : undefined,
      media:
        ormEntity.fileKey && ormEntity.fileName && ormEntity.fileWeight
          ? MediaMessageVO.create({
              fileKey: ormEntity.fileKey,
              fileName: ormEntity.fileName,
              fileWeight: ormEntity.fileWeight,
            })
          : undefined,
      system:
        ormEntity.systemMessageType && ormEntity.contractData
          ? SystemMessageVO.create({
              type: ormEntity.systemMessageType,
              contractData: {
                ...ormEntity.contractData,
                arrivalDate: ormEntity.contractData.arrivalDate
                  ? DateUtil.parseUTC(ormEntity.contractData.arrivalDate).toDate()
                  : undefined,
                departureDate: ormEntity.contractData.departureDate
                  ? DateUtil.parseUTC(ormEntity.contractData.departureDate).toDate()
                  : undefined,
                transactionsMeta: ormEntity.contractData.transactionsMeta?.map((meta) => ({
                  ...meta,
                  endDate: new Date(meta.endDate),
                  startDate: new Date(meta.startDate),
                  withdrawFundsDate: new Date(meta.withdrawFundsDate),
                })),
              },
            })
          : undefined,
    };

    return { id, props };
  }
}
