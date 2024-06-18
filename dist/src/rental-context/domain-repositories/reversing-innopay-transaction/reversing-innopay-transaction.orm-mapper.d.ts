import { ReversingInnopayTransactionEntity, ReversingInnopayTransactionProps } from '@domains/innopay-transaction/domain/entities/reversing-innopay-transaction.entity';
import { ReversingInnopayTransactionOrmEntity } from '@infrastructure/database/entities/reversing-innopay-transaction.orm-entity';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class ReversingInnopayTransactionOrmMapper extends OrmMapper<ReversingInnopayTransactionEntity, ReversingInnopayTransactionOrmEntity> {
    protected toOrmProps(entity: ReversingInnopayTransactionEntity): Promise<OrmEntityProps<ReversingInnopayTransactionOrmEntity>>;
    protected toDomainProps(ormEntity: ReversingInnopayTransactionOrmEntity): Promise<EntityProps<ReversingInnopayTransactionProps>>;
}
