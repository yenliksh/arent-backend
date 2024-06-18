import { InnopayAppointmentCardType, InnopayCardType } from '@domains/innopay-card/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { InnopayUsersOrmEntity } from './innopay-users.orm-entity';
export declare class InnopayCardOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<InnopayCardOrmEntity, keyof Model>): InnopayCardOrmEntity;
    static tableName: string;
    id: string;
    innopayId: string;
    cnpCardId: number;
    panMasked: string;
    cardHolder: string;
    cardType: InnopayCardType;
    appointmentType: InnopayAppointmentCardType;
    innopayUser?: InnopayUsersOrmEntity;
    contracts?: InnopayCardOrmEntity[];
    static relationMappings: RelationMappingsThunk;
}
