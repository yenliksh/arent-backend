import { GenderType } from '@domains/user/domain/types';
export declare class ProfileEditPersonalInfoRequest {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly middleName?: string;
    readonly gender?: GenderType;
    readonly birthdate?: string;
}
