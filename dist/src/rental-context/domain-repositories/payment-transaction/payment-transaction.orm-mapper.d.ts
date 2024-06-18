import { PaymentTransactionEntity, PaymentTransactionProps } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class PaymentTransactionOrmMapper extends OrmMapper<PaymentTransactionEntity, PaymentTransactionOrmEntity> {
    protected toOrmProps(entity: PaymentTransactionEntity): Promise<OrmEntityProps<PaymentTransactionOrmEntity>>;
    protected toDomainProps(ormEntity: PaymentTransactionOrmEntity, trxId?: TransactionId): Promise<EntityProps<PaymentTransactionProps>>;
}
