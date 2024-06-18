import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdComplaintResponse extends OkResponse {
  constructor(result: boolean) {
    super({ ok: result });
  }

  static create(result: boolean) {
    const payload = new ApartmentAdComplaintResponse(result);

    return payload;
  }
}
