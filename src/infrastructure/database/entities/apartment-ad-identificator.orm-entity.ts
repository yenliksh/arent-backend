import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model } from 'objection';

export class ApartmentAdIdentificatorOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ApartmentAdIdentificatorOrmEntity, keyof Model>) {
    return ApartmentAdIdentificatorOrmEntity.fromJson(data);
  }

  static tableName = 'apartment_identificator';
  apartmentId: string;
  adSearchId?: number;

  slug?: string;
  titleSeo: string;
  descriptionSeo?: string;
  keywordsSeo?: string;
}
