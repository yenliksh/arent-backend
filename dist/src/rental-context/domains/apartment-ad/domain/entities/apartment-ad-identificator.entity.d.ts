import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ApartmentAdIdentificatorProps } from './apartment-ad.types';
export declare class ApartmentAdIdentificatorEntity extends AggregateRoot<ApartmentAdIdentificatorProps> {
    protected readonly _id: UUID;
    static create({ apartmentId, titleSeo, slug, keywordsSeo, descriptionSeo, }: ApartmentAdIdentificatorProps): ApartmentAdIdentificatorEntity;
    adminEditH1MetaTag(h1: string): this;
    adminEditTitleMetaTag(title: string): this;
    adminEditDescriptionMetaTag(description: string): this;
    validate(): void;
}
