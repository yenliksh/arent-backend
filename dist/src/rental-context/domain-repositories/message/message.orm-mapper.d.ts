import { MessageEntity, MessageProps } from '@domains/message/domain/entities/message.entity';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class MessageOrmMapper extends OrmMapper<MessageEntity, MessageOrmEntity> {
    protected toOrmProps(entity: MessageEntity): Promise<OrmEntityProps<MessageOrmEntity>>;
    protected toDomainProps(ormEntity: MessageOrmEntity): Promise<EntityProps<MessageProps>>;
}
