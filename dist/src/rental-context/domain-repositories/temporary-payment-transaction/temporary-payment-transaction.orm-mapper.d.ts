import { TemporaryPaymentTransactionEntity, TemporaryPaymentTransactionProps } from '@domains/temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity';
import { TemporaryPaymentTransactionOrmEntity } from '@infrastructure/database/entities/temporary-payment-transaction.orm-entity';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class TemporaryPaymentTransactionOrmMapper extends OrmMapper<TemporaryPaymentTransactionEntity, TemporaryPaymentTransactionOrmEntity> {
    protected toOrmProps(entity: TemporaryPaymentTransactionEntity): Promise<OrmEntityProps<TemporaryPaymentTransactionOrmEntity>>;
    protected toDomainProps(ormEntity: TemporaryPaymentTransactionOrmEntity): Promise<EntityProps<TemporaryPaymentTransactionProps>>;
}
