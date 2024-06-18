import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SlugModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  slug?: string;

  @Field(() => String)
  apartmentId?: string;

  static create({ id, slug, apartmentId }: SlugModel) {
    const payload = new SlugModel();

    payload.id = id;
    payload.slug = slug;
    payload.apartmentId = apartmentId;

    return payload;
  }
}
