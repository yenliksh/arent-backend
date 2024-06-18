import { ContractRequestEntity, ContractRequestProps } from '@domains/contract-request/domain/entities/contract-request.entity';
import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class ContractRequestOrmMapper extends OrmMapper<ContractRequestEntity, ContractRequestOrmEntity> {
    protected toOrmProps(entity: ContractRequestEntity): Promise<OrmEntityProps<ContractRequestOrmEntity>>;
    protected toDomainProps(ormEntity: ContractRequestOrmEntity, trxId?: TransactionId): Promise<EntityProps<ContractRequestProps>>;
}
