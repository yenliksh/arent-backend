import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
export declare class UserComplaintResponse extends OkResponse {
    constructor(result: boolean);
    static create(result: boolean): UserComplaintResponse;
}
