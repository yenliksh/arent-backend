import { ValidatorConstraintInterface } from 'class-validator';
export declare class SmscodeValidator implements ValidatorConstraintInterface {
    private _length;
    validate(value: string): boolean;
    defaultMessage(): string;
}
