import { ContractEntity, ContractProps } from '@domains/contract/domain/entities/contract.entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
export declare class ContractOrmMapper extends OrmMapper<ContractEntity, ContractOrmEntity> {
    protected toOrmProps(entity: ContractEntity): Promise<OrmEntityProps<ContractOrmEntity>>;
    protected toDomainProps(ormEntity: ContractOrmEntity, trxId?: TransactionId): Promise<EntityProps<ContractProps>>;
}
