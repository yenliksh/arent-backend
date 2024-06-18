import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileConfirmVerificationEmailResponse extends OkResponse {
  constructor(token: string) {
    super({ ok: !!token });
  }

  static create(token: string) {
    const payload = new ProfileConfirmVerificationEmailResponse(token);

    return payload;
  }
}
