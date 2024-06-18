import { ApartmentAdViewModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { BaseContractModel } from '@domains/contract/models/contract.model';
import { UserModel } from '@domains/user/models/user.model';
import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { ContractRequestStatus } from '../domain/types';
import { ApartmentGuestsModel } from './sub-models/apartment-guests.model';
export declare class ContractRequestModel extends ModelBase {
    constructor(contractRequest: ContractRequestOrmEntity);
    tenantId?: string;
    apartmentAdId?: string;
    apartmentRentPeriodType: ApartmentRentPeriodType;
    arrivalDate?: string;
    departureDate?: string;
    status: ContractRequestStatus;
    guests: ApartmentGuestsModel;
    comment?: string;
    rejectReason?: string;
    contract?: BaseContractModel;
    tenant?: UserModel;
    apartmentAd?: ApartmentAdViewModel;
    static create(props: ContractRequestOrmEntity): ContractRequestModel;
}
