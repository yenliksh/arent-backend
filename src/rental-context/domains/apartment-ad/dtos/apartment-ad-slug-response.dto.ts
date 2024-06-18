import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdSlugResponse {
  @Field(() => String)
  titleSeo: string;

  @Field(() => Number)
  adSearchId?: number;

  static create(props: { titleSeo: string; adSearchId?: number }) {
    const payload = new ApartmentAdSlugResponse();

    payload.titleSeo = props.titleSeo;
    payload.adSearchId = props.adSearchId;

    return payload;
  }
}
