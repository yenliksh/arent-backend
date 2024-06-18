import { ChatEntity, ChatProps } from '@domains/chat/domain/entities/chat.entity';
import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class ChatOrmMapper extends OrmMapper<ChatEntity, ChatOrmEntity> {
    protected toOrmProps(entity: ChatEntity): Promise<OrmEntityProps<ChatOrmEntity>>;
    protected toDomainProps(ormEntity: ChatOrmEntity, trxId?: TransactionId): Promise<EntityProps<ChatProps>>;
}
