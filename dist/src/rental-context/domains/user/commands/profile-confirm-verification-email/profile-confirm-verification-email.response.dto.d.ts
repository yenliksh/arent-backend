import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
export declare class ProfileConfirmVerificationEmailResponse extends OkResponse {
    constructor(token: string);
    static create(token: string): ProfileConfirmVerificationEmailResponse;
}
