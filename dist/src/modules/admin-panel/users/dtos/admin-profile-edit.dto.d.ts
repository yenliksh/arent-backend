import { GenderType } from '@domains/user/domain/types';
declare class AdminProfileEditGuarantorDto {
    firstName: string;
    lastName: string;
    phone: string;
}
declare class AdminProfileEditNameDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName?: string | null;
}
export declare class AdminProfileEditUserInfoDto {
    birthdate?: string;
    gender?: GenderType;
    guarantor?: AdminProfileEditGuarantorDto;
    userName?: AdminProfileEditNameDto;
}
export {};
