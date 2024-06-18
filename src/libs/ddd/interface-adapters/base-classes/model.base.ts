import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Field, ObjectType } from '@nestjs/graphql';

import { IdResponse } from '../dtos/id.response.dto';

@ObjectType()
export class ModelBase extends IdResponse {
  constructor(entity: ObjectionEntityBase) {
    super(entity.id);

    this.createdAt = entity.createdAt.toISOString();
    this.updatedAt = entity.updatedAt.toISOString();
    this.deletedAt = entity.deletedAt?.toISOString();
  }

  @Field(() => String)
  readonly createdAt: string;

  @Field(() => String)
  readonly updatedAt: string;

  @Field(() => String, { nullable: true })
  readonly deletedAt?: string;
}
