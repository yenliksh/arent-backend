import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class UrlValidator implements ValidatorConstraintInterface {
    validate(value: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
