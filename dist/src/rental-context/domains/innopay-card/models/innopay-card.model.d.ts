import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { InnopayAppointmentCardType, InnopayCardType } from '../domain/types';
export declare class InnopayCardModel extends ModelBase {
    constructor(card: InnopayCardOrmEntity);
    cnpCardId: number;
    panMasked: string;
    cardType: InnopayCardType;
    appointmentType: InnopayAppointmentCardType;
    static create(props: InnopayCardOrmEntity): InnopayCardModel;
}
