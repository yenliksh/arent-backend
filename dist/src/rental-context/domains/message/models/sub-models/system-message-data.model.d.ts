import { ISystemMessageData, ISystemMessageOrmData } from '@domains/message/domain/types';
import { ApartmentRentPeriodType, ContractStatus, LongTermRentCancellationPolicyType, ShortTermRentBookingType, ShortTermRentCancellationPolicyType, ShortTermRentPaymentType } from '@infrastructure/enums';
import { ApartmentAdRulesModel } from '@infrastructure/models/apartment-ad-rules.model';
export declare class SystemMessageDataModel {
    rules?: ApartmentAdRulesModel;
    cost?: string;
    arrivalDate?: string;
    departureDate?: string;
    shortTermRentCancellationPolicyType?: ShortTermRentCancellationPolicyType;
    longTermRentCancellationPolicyType?: LongTermRentCancellationPolicyType;
    apartmentRentPeriodType?: ApartmentRentPeriodType;
    comment?: string;
    status: ContractStatus;
    shortTermRentBookingType?: ShortTermRentBookingType;
    shortTermRentPaymentType?: ShortTermRentPaymentType;
    constructor(model: ISystemMessageData);
    static create(props: ISystemMessageOrmData): SystemMessageDataModel;
    static transform(props: ISystemMessageOrmData): ISystemMessageData;
}
