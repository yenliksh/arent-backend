import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { LongTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { ApartmentAdStatusType, CurrencyType } from '../domain/types';
import { ApartmentAdModel, ApartmentAdViewModel } from './apartment-ad.model';
export declare class BaseApartmentAdLongTermRentModel extends ModelBase {
    protected constructor(props: LongTermRentOrmEntity);
    id: string;
    cost: string;
    currency: CurrencyType;
    cancellationPolicy?: LongTermRentCancellationPolicyType;
    apartmentAdId: string;
    status: ApartmentAdStatusType[];
    isApproved: boolean;
    declineReason?: string | null;
}
export declare class ApartmentAdLongTermRentModel extends BaseApartmentAdLongTermRentModel {
    constructor(props: LongTermRentOrmEntity);
    ownershipDocuments?: string[];
    apartmentAd?: ApartmentAdModel;
    static create(props: LongTermRentOrmEntity): ApartmentAdLongTermRentModel;
}
export declare class ApartmentAdLongTermRentViewModel extends BaseApartmentAdLongTermRentModel {
    constructor(props: LongTermRentOrmEntity);
    apartmentAd?: ApartmentAdViewModel;
    static create(props: LongTermRentOrmEntity): ApartmentAdLongTermRentModel;
}
