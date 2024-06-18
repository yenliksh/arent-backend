import { ApartmentAdCharacteristicsProps } from '@domain-value-objects/apartment-characteristics.value-object';
import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { PaymentMethod } from '@infrastructure/enums';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ApartmentCategory, ApartmentType, LegalCapacityType, RentPeriodType } from 'src/rental-context/domains/apartment-ad/domain/types';
import { ApartmentAdDescriptionProps } from 'src/rental-context/domains/apartment-ad/domain/value-objects/apartment-ad-description.value-object';
import { MediaProps } from 'src/rental-context/domains/apartment-ad/domain/value-objects/media.value-object';
import { ApartmentAdComplaintOrmEntity } from './apartment-ad-complaint.orm-entity';
import { ContractRequestOrmEntity } from './contract-request.orm-entity';
import { ContractOrmEntity } from './contract.orm-entity';
import { InnopayCardOrmEntity } from './innopay-card.orm-entity';
import { LongTermRentOrmEntity } from './long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from './short-term-rent.orm-entity';
import { UserOrmEntity } from './user.orm-entity';
export declare class ApartmentAdOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<ApartmentAdOrmEntity, keyof Model>): ApartmentAdOrmEntity;
    static tableName: string;
    landlordId: string;
    landlord?: UserOrmEntity | null;
    rentPeriodType: RentPeriodType;
    apartmentType: ApartmentType;
    apartmentCategory: ApartmentCategory;
    longTermRent?: LongTermRentOrmEntity | null;
    shortTermRent?: ShortTermRentOrmEntity | null;
    numberOfGuests?: number;
    numberOfRooms?: number;
    country?: string;
    city?: string;
    street?: string;
    region?: string;
    houseNumber?: string;
    lat?: number;
    lng?: number;
    timezone?: string;
    completeStep: number;
    media?: MediaProps;
    description?: ApartmentAdDescriptionProps;
    rules?: ApartmentRulesProps;
    characteristics?: ApartmentAdCharacteristicsProps;
    legalCapacityType: LegalCapacityType;
    legalCapacityTinBin?: string;
    legalCapacityCompanyName?: string;
    legalCapacityAddress?: string;
    defaultPaymentMethod?: PaymentMethod;
    innopayCardId?: string;
    innopayCard?: InnopayCardOrmEntity;
    contractRequests?: ContractRequestOrmEntity[];
    contracts?: ContractOrmEntity[];
    apartmentAdComplaints?: ApartmentAdComplaintOrmEntity[];
    static relationMappings: RelationMappingsThunk;
}
