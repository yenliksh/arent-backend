import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class DateISOValidator implements ValidatorConstraintInterface {
    validate(value: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
