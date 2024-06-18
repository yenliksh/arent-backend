import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendRequestEmailResponse extends OkResponse {
  constructor(response: string) {
    super({ ok: !!response });
  }

  static create(response: string) {
    const payload = new SendRequestEmailResponse(response);

    return payload;
  }
}
