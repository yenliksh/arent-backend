import { ApartmentAdIdentificatorOrmEntity } from '@infrastructure/database/entities/apartment-ad-identificator.orm-entity';
import { SlugModel } from '@infrastructure/models/slug.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdsSlugResponse {
  @Field(() => [SlugModel])
  slugs: SlugModel[];

  static create(props: { apAdIds: ApartmentAdIdentificatorOrmEntity[] }) {
    const payload = new ApartmentAdsSlugResponse();

    const slugs = props.apAdIds.map((el) => {
      return { id: el.id, slug: `${el.adSearchId}-${el.titleSeo}`, apartmentId: el.apartmentId };
    });

    payload.slugs = slugs;

    return payload;
  }
}
