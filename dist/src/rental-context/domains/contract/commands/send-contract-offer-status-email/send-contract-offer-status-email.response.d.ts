import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
export declare class SendContractOfferStatusEmailResponse extends OkResponse {
    constructor(response: string);
    static create(response: string): SendContractOfferStatusEmailResponse;
}
