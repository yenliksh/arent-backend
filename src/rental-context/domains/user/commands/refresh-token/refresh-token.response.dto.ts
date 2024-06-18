import { Field, ObjectType } from '@nestjs/graphql';

import { RefreshTokenResult } from './refresh-token.service';

@ObjectType()
export class RefreshTokenResponse {
  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  token?: string;

  static create(props: RefreshTokenResult) {
    const payload = new RefreshTokenResponse();

    payload.refreshToken = props.refreshToken;
    payload.token = props.token;

    return payload;
  }
}
