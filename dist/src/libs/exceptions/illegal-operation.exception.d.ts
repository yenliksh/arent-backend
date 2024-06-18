import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';
export declare class IllegalOperationException extends ExceptionBase {
    readonly code = ExceptionCodes.illegalOperation;
}
