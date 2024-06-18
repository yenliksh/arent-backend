export declare class AdminProfileEditNameCommand {
    readonly userId: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName?: string | null | undefined;
    constructor(userId: string, firstName: string, lastName: string, middleName?: string | null | undefined);
}
