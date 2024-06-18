import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class LoginValidator implements ValidatorConstraintInterface {
    validate(value: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
