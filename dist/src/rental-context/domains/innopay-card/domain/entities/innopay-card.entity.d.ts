import { InnopayAppointmentCardType, InnopayCardType } from '@domains/innopay-card/domain/types';
import { CardMeta } from '@domains/payment-transaction/domain/types';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { PanMaskedVO } from '../value-objects/pan-masked.value-object';
export interface CreateInnopayCardProps {
    cnpCardId: number;
    panMasked: PanMaskedVO;
    cardHolder: string;
    cardType: InnopayCardType;
    appointmentType: InnopayAppointmentCardType;
    userId: UUID;
    cnpUserId: number;
}
export declare type InnopayCardProps = CreateInnopayCardProps;
export declare class InnopayCardEntity extends AggregateRoot<InnopayCardProps> {
    protected readonly _id: UUID;
    static create({ cnpCardId, panMasked, cardHolder, cardType, cnpUserId, userId, appointmentType, }: CreateInnopayCardProps): InnopayCardEntity;
    get id(): UUID;
    get cnpCardId(): number;
    get cnpUserId(): number;
    get userId(): UUID;
    get cardMeta(): CardMeta;
    validate(): void;
}
