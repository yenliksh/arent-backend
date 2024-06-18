import { Field, ObjectType } from '@nestjs/graphql';

import { GuarantorProps } from '../../domain/value-objects/guarantor.value-object';

@ObjectType()
export class GuarantorModel {
  @Field(() => String)
  phone: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  static create(guarantor: GuarantorProps) {
    const payload = new GuarantorModel();

    Object.assign(payload, guarantor);

    return payload;
  }
}
