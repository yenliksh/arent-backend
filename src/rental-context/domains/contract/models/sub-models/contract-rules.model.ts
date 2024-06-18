import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContractRulesModel {
  @Field(() => Boolean)
  allowedWithPets: boolean;

  @Field(() => Boolean)
  allowedWithChildren: boolean;

  @Field(() => Boolean)
  allowedToSmoke: boolean;

  @Field(() => Boolean)
  allowedToHangingOut: boolean;

  static create(props: ApartmentRulesProps) {
    const payload = new ContractRulesModel();
    Object.assign(payload, props);

    return payload;
  }
}
