import { prependDomainUrlToFileKey } from '@libs/utils/file-key.helper';
import { Field, ObjectType } from '@nestjs/graphql';

import { IMedia } from '../../domain/value-objects/media.value-object';

@ObjectType()
export class ApartmentAdMediaModel {
  @Field(() => Number)
  order: number;

  @Field(() => String)
  fileKey: string;

  constructor(model: ApartmentAdMediaModel) {
    Object.assign(this, model);
  }

  static create({ order, fileKey }: IMedia) {
    return new ApartmentAdMediaModel({ order, fileKey: prependDomainUrlToFileKey(fileKey) });
  }
}
