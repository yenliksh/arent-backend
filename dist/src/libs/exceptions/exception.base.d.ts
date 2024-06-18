export interface SerializedException {
    message: string;
    code: string;
    stack?: string;
    metadata?: unknown;
}
export declare abstract class ExceptionBase extends Error {
    readonly message: string;
    readonly metadata?: unknown;
    constructor(message: string, metadata?: unknown);
    abstract code: string;
    toJSON(): SerializedException;
}
