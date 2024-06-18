import { GenderType } from '@domains/user/domain/types';
export declare class AdminProfileEditGenderCommand {
    readonly userId: string;
    readonly gender: GenderType;
    constructor(userId: string, gender: GenderType);
}
