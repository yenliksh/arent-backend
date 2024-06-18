import { registerEnumType } from '@nestjs/graphql';

export enum BucketType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

registerEnumType(BucketType, {
  name: 'BucketType',
});
