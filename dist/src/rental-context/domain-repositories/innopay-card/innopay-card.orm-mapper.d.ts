import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
import { InnopayCardEntity, InnopayCardProps } from '../../domains/innopay-card/domain/entities/innopay-card.entity';
export declare class InnopayCardOrmMapper extends OrmMapper<InnopayCardEntity, InnopayCardOrmEntity> {
    protected toOrmProps(entity: InnopayCardEntity, trxId?: TransactionId): Promise<OrmEntityProps<InnopayCardOrmEntity>>;
    protected toDomainProps(ormEntity: InnopayCardOrmEntity, trxId?: TransactionId): Promise<EntityProps<InnopayCardProps>>;
}
