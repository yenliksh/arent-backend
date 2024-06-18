import { ContractRequestModel } from '@domains/contract-request/models/contract-request.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { PaymentMethod } from '@infrastructure/enums';
import { ApartmentAdCharacteristicsModel } from '@infrastructure/models/apartment-ad-characteristics.model';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { UserMeModel, UserModel } from 'src/rental-context/domains/user/models/user.model';
import { ApartmentAdRulesModel } from '../../../../infrastructure/models/apartment-ad-rules.model';
import { ApartmentCategory, ApartmentType, RentPeriodType } from '../domain/types';
import { ApartmentAdLongTermRentModel, ApartmentAdLongTermRentViewModel } from './apartment-ad-long-term-rent.model';
import { ApartmentAdShortTermRentModel, ApartmentAdShortTermRentViewModel } from './apartment-ad-short-term-rent.model';
import { ApartmentAdAddressModel } from './sub-models/apartment-ad-address.model';
import { ApartmentAdDescriptionModel } from './sub-models/apartment-ad-description.model';
import { ApartmentAdDetailsModel } from './sub-models/apartment-ad-details.model';
import { ApartmentAdMediaModel } from './sub-models/apartment-ad-media.model';
export declare class BaseApartmentAdModel extends ModelBase {
    protected constructor(props: ApartmentAdOrmEntity);
    landlordId: string;
    rentPeriodType: RentPeriodType;
    apartmentType: ApartmentType;
    apartmentCategory: ApartmentCategory;
    details?: ApartmentAdDetailsModel;
    address?: ApartmentAdAddressModel;
    photos: ApartmentAdMediaModel[];
    videos: ApartmentAdMediaModel[];
    description?: ApartmentAdDescriptionModel;
    rules?: ApartmentAdRulesModel;
    characteristics?: ApartmentAdCharacteristicsModel;
    defaultPaymentMethod?: PaymentMethod;
}
export declare class ApartmentAdModel extends BaseApartmentAdModel {
    constructor(apartmentAd: ApartmentAdOrmEntity);
    innopayCardId?: string;
    completeStep: number;
    landlord?: UserMeModel;
    longTermRent?: ApartmentAdLongTermRentModel;
    shortTermRent?: ApartmentAdShortTermRentModel;
    adDescription: ApartmentAdDescriptionModel | undefined;
    adCharacteristics: ApartmentAdCharacteristicsModel | undefined;
    static create(props: ApartmentAdOrmEntity): ApartmentAdModel;
}
export declare class ApartmentAdViewModel extends BaseApartmentAdModel {
    constructor(apartmentAd: ApartmentAdOrmEntity);
    contractRequests?: ContractRequestModel[];
    landlord?: UserModel;
    longTermRent?: ApartmentAdLongTermRentViewModel;
    shortTermRent?: ApartmentAdShortTermRentViewModel;
    static create(props: ApartmentAdOrmEntity): ApartmentAdViewModel;
}
