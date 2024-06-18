import { Field, ObjectType } from '@nestjs/graphql';

import { Id } from '../interfaces/id.interface';

@ObjectType()
export class IdResponse implements Id {
  constructor(id: string) {
    this.id = id;
  }

  @Field(() => String, { description: 'ex. 2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231' })
  readonly id: string;
}
