import { Field, ObjectType } from '@nestjs/graphql';

import { ApartmentAdDescriptionProps } from '../../domain/value-objects/apartment-ad-description.value-object';

type ApartmentAdDescriptionModelCreateProps = Partial<ApartmentAdDescriptionProps>;

@ObjectType()
export class ApartmentAdDescriptionModel {
  @Field(() => String)
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Boolean, { nullable: true })
  remoteView?: boolean | null;

  @Field(() => Boolean, { nullable: true })
  selfCheckIn?: boolean | null;

  @Field(() => Boolean, { nullable: true })
  freeParking?: boolean | null;

  @Field(() => Boolean, { nullable: true })
  workSpace?: boolean | null;

  @Field(() => Boolean, { nullable: true })
  quite?: boolean | null;

  @Field(() => Boolean, { nullable: true })
  forFamily?: boolean | null;

  constructor(model: ApartmentAdDescriptionModel) {
    Object.assign(this, model);
  }

  static create(props: ApartmentAdDescriptionModelCreateProps) {
    return new ApartmentAdDescriptionModel(props);
  }
}
