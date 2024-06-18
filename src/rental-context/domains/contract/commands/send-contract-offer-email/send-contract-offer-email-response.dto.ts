import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendContractOfferEmailResponse extends OkResponse {
  constructor(response: string) {
    super({ ok: !!response });
  }

  static create(response: string) {
    const payload = new SendContractOfferEmailResponse(response);

    return payload;
  }
}
