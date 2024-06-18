import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { Field, ObjectType } from '@nestjs/graphql';

type ApartmentAdRulesModelCreateProps = Required<ApartmentRulesProps>;

@ObjectType()
export class ApartmentAdRulesModel {
  @Field(() => Boolean)
  allowedWithPets: boolean | null;

  @Field(() => Boolean)
  allowedWithChildren: boolean | null;

  @Field(() => Boolean)
  allowedToSmoke: boolean | null;

  @Field(() => Boolean)
  allowedToHangingOut: boolean | null;

  constructor(model: ApartmentAdRulesModel) {
    Object.assign(this, model);
  }

  static create(props: ApartmentAdRulesModelCreateProps) {
    return new ApartmentAdRulesModel(props);
  }
}
