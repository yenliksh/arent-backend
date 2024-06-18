import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdIdentificatorResponse {
  @Field(() => String)
  apartmentId: string;

  @Field(() => String)
  keywordsSeo?: string;

  @Field(() => String)
  titleSeo?: string;

  @Field(() => String)
  descriptionSeo?: string;

  static create(props: { apartmentId: string; keywordsSeo?: string; titleSeo?: string; descriptionSeo?: string }) {
    const payload = new ApartmentAdIdentificatorResponse();

    payload.apartmentId = props.apartmentId;
    payload.keywordsSeo = props.keywordsSeo || '';
    payload.titleSeo = props.titleSeo || '';
    payload.descriptionSeo = props.descriptionSeo || '';

    return payload;
  }
}
