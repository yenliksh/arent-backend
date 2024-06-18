import { ValidatorConstraintInterface } from 'class-validator';
export declare class SendMessageTypeValidator implements ValidatorConstraintInterface {
    validate(value: string): boolean;
    defaultMessage(): string;
}
