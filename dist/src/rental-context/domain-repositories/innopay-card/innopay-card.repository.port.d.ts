import { InnopayCardEntity, InnopayCardProps } from '@domains/innopay-card/domain/entities/innopay-card.entity';
import { InnopayAppointmentCardType } from '@domains/innopay-card/domain/types';
import { InnopayUsersOrmEntity } from '@infrastructure/database/entities/innopay-users.orm-entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
export interface InnopayCardRepositoryPort extends RepositoryPort<InnopayCardEntity, InnopayCardProps> {
    findCreditingInnopayUser(userId: string): Promise<InnopayUsersOrmEntity | undefined>;
    findCreditingInnopayUserByCnpUserId(cnpUserId: number): Promise<InnopayUsersOrmEntity | undefined>;
    saveInnopayUser(entity: Omit<InnopayUsersOrmEntity, keyof ObjectionEntityBase>): Promise<InnopayUsersOrmEntity>;
    findManyByUserId(userId: string, trxId?: TransactionId): Promise<InnopayCardEntity[]>;
    isCardExist(cardData: {
        cardId: string;
        userId: string;
        appointmentType?: InnopayAppointmentCardType;
    }, trxId?: TransactionId): Promise<boolean>;
}
