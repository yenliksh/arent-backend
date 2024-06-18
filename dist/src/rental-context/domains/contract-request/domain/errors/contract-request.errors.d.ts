import { ExceptionBase } from '@libs/exceptions';
export declare class ContractRequestHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Contract request entity has empty fields";
    readonly code = "CONTRACT_REQUEST.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
export declare class ContractRequestHasNullRequiredFieldsError extends ExceptionBase {
    static message: string;
    readonly code = "CONTRACT_REQUEST.HAS_NULL_REQUIRED_FIELDS";
    constructor(metadata?: unknown);
}
