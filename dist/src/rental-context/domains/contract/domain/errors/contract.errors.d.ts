import { ExceptionBase } from '@libs/exceptions';
export declare class ContractHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Contract entity has empty fields";
    readonly code = "CONTRACT.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
