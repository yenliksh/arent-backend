import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';

import { ApartmentAdIdentificatorProps } from './apartment-ad.types';

export class ApartmentAdIdentificatorEntity extends AggregateRoot<ApartmentAdIdentificatorProps> {
  protected readonly _id: UUID;

  static create({
    apartmentId,
    titleSeo,
    slug,
    keywordsSeo,
    descriptionSeo,
  }: ApartmentAdIdentificatorProps): ApartmentAdIdentificatorEntity {
    const props: ApartmentAdIdentificatorProps = {
      apartmentId,
      titleSeo,
      keywordsSeo,
      descriptionSeo,
      slug,
    };

    const id = UUID.generate();

    const apartmentAd = new ApartmentAdIdentificatorEntity({ id, props });

    return apartmentAd;
  }

  public adminEditH1MetaTag(h1: string) {
    this.props.keywordsSeo = h1;
    return this;
  }

  public adminEditTitleMetaTag(title: string) {
    this.props.titleSeo = title;
    return this;
  }

  public adminEditDescriptionMetaTag(description: string) {
    this.props.descriptionSeo = description;
    return this;
  }

  validate(): void {
    const { apartmentId } = this.props;

    if (!apartmentId) {
      throw new IllegalOperationException('Apartment should have apartment id');
    }
  }
}
