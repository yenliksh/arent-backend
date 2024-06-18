import { ExceptionBase } from './exception.base';
import { ExceptionCodes } from './exception.codes';
export declare class ArgumentNotProvidedException extends ExceptionBase {
    readonly code = ExceptionCodes.argumentNotProvided;
}
