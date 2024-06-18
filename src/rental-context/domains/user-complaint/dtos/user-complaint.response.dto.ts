import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserComplaintResponse extends OkResponse {
  constructor(result: boolean) {
    super({ ok: result });
  }

  static create(result: boolean) {
    const payload = new UserComplaintResponse(result);

    return payload;
  }
}
