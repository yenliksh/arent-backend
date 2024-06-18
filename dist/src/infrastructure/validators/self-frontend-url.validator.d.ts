import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { UrlValidator } from './url.validator';
export declare class SelfFrontendUrlValidator extends UrlValidator implements ValidatorConstraintInterface {
    validate(value?: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
