import { ApartmentAdModel, ApartmentAdViewModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { ApartmentGuestsModel } from '@domains/contract-request/models/sub-models/apartment-guests.model';
import { InnopayCardModel } from '@domains/innopay-card/models/innopay-card.model';
import { UserMeModel, UserModel } from '@domains/user/models/user.model';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { ApartmentRentPeriodType, ContractStatus, LongTermRentCancellationPolicyType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';
import { BaseContractApartmentAdDataModel } from './sub-models/base-contract-apartment-ad-data.model';
import { ContractCancelationModel } from './sub-models/contract-cancelation.model';
import { ContractRulesModel } from './sub-models/contract-rules.model';
import { InnopayPaymentPageModel } from './sub-models/innopay-payment-page.model';
import { NextPaymentInfoModel } from './sub-models/next-payment-info.model';
export declare class BaseContractModel extends ModelBase {
    constructor(props: ContractOrmEntity);
    contractRequestId?: string;
    tenantId?: string;
    landlordId?: string;
    apartmentAdId?: string;
    apartmentRentPeriodType: ApartmentRentPeriodType;
    cost: string;
    currency: CurrencyType;
    status: ContractStatus;
    arrivalDate?: string;
    departureDate?: string;
    rules?: ContractRulesModel;
    shortTermRentCancellationPolicyType?: ShortTermRentCancellationPolicyType;
    longTermRentCancellationPolicyType?: LongTermRentCancellationPolicyType;
    isPending: boolean;
    isTemporary: boolean;
    guests: ApartmentGuestsModel;
    baseApartmentAdData: BaseContractApartmentAdDataModel;
}
export declare class ContractLandlordModel extends BaseContractModel {
    constructor(contract: ContractOrmEntity);
    nextPaymentTransactionId?: string;
    apartmentAd?: ApartmentAdModel;
    landlord?: UserMeModel;
    tenant?: UserModel;
    nextPayment?: NextPaymentInfoModel;
    static create(props: ContractOrmEntity): ContractLandlordModel;
}
export declare class ContractTenantModel extends BaseContractModel {
    constructor(contract: ContractOrmEntity);
    innopayCardId?: string;
    nextPaymentTransactionId?: string;
    apartmentAd?: ApartmentAdViewModel;
    landlord?: UserModel;
    tenant?: UserMeModel;
    innopayCard?: InnopayCardModel;
    nextPayment?: NextPaymentInfoModel;
    contractCancelation?: ContractCancelationModel;
    static create(props: ContractOrmEntity): ContractTenantModel;
}
export declare class ContractChatModel extends BaseContractModel {
    constructor(contract: ContractOrmEntity);
    apartmentAd?: ApartmentAdViewModel;
    landlord?: UserModel;
    tenant?: UserModel;
    innopayPaymentPageModel?: InnopayPaymentPageModel;
    static create(props: ContractOrmEntity): ContractTenantModel;
}
