import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model } from 'objection';
export declare class ApartmentAdIdentificatorOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<ApartmentAdIdentificatorOrmEntity, keyof Model>): ApartmentAdIdentificatorOrmEntity;
    static tableName: string;
    apartmentId: string;
    adSearchId?: number;
    slug?: string;
    titleSeo: string;
    descriptionSeo?: string;
    keywordsSeo?: string;
}
