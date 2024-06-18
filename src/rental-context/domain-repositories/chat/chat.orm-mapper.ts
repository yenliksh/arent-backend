import { ChatMemberEntity } from '@domains/chat/domain/entities/chat-member.entity';
import { ChatEntity, ChatProps } from '@domains/chat/domain/entities/chat.entity';
import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ContractStatus } from '@infrastructure/enums';
import { DateVO } from '@libs/ddd/domain/value-objects/date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
import { NotFoundException } from '@nestjs/common';

export class ChatOrmMapper extends OrmMapper<ChatEntity, ChatOrmEntity> {
  protected async toOrmProps(entity: ChatEntity): Promise<OrmEntityProps<ChatOrmEntity>> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<ChatOrmEntity> = {
      contractId: props.contractId.value,
      lastMessageId: props.lastMessageId ? props.lastMessageId?.value : undefined,
      lastOfferMessageId: props.lastOfferMessageId ? props.lastOfferMessageId.value : undefined,
      members: props.members
        ? props.members.map((member) => {
            const memberProps = member.getPropsCopy();
            return ChatMemberOrmEntity.create({
              id: memberProps.id.value,
              chatId: props.id.value,
              memberId: memberProps.memberId.value,
              role: memberProps.role,
              lastReadMessageId: memberProps.lastReadMessageId?.value,
              createdAt: memberProps.createdAt.value,
              updatedAt: memberProps.updatedAt.value,
              deletedAt: memberProps.deletedAt?.value,
            });
          })
        : undefined,
    };

    return ormProps;
  }

  protected async toDomainProps(ormEntity: ChatOrmEntity, trxId?: TransactionId): Promise<EntityProps<ChatProps>> {
    const id = new UUID(ormEntity.id);

    const trx = trxId ? this.unitOfWork?.getTrx(trxId) : undefined;

    const [members, contract] = await Promise.all([
      ChatMemberOrmEntity.query(trx).where({ chatId: ormEntity.id }),
      ContractOrmEntity.query(trx).select('status').findById(ormEntity.contractId),
    ]);

    if (!contract) {
      throw new NotFoundException('Chat mast have relation with contract');
    }

    const activeChatContractStatus = [ContractStatus.REJECTED, ContractStatus.COMPLETED];

    const props: ChatProps = {
      contractId: new UUID(ormEntity.contractId),
      lastMessageId: ormEntity.lastMessageId ? new UUID(ormEntity.lastMessageId) : undefined,
      lastOfferMessageId: ormEntity.lastOfferMessageId ? new UUID(ormEntity.lastOfferMessageId) : undefined,
      isActive: !activeChatContractStatus.includes(contract.status),
      members: members.map(
        (member) =>
          new ChatMemberEntity({
            id: new UUID(member.id),
            props: {
              chatId: id,
              memberId: new UUID(member.memberId),
              role: member.role,
              lastReadMessageId: member.lastReadMessageId ? new UUID(member.lastReadMessageId) : undefined,
            },
            createdAt: new DateVO(member.createdAt),
            updatedAt: new DateVO(member.updatedAt),
            deletedAt: member.deletedAt ? new DateVO(member.deletedAt) : null,
          }),
      ),
    };

    return { id, props };
  }
}
