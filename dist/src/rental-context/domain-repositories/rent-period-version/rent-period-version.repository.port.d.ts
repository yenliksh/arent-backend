import { RentPeriodVersionEntity, RentPeriodVersionProps } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
export interface RentPeriodVersionRepositoryPort extends RepositoryPort<RentPeriodVersionEntity, RentPeriodVersionProps> {
    findLast(trxId?: TransactionId): Promise<RentPeriodVersionEntity | undefined>;
}
