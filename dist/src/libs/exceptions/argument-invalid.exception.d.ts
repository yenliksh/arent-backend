import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';
export declare class ArgumentInvalidException extends ExceptionBase {
    readonly code = ExceptionCodes.argumentInvalid;
}
