import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface TextMessageProps {
    text: string;
}
export declare class TextMessageVO extends ValueObject<TextMessageProps> {
    static create(props: TextMessageProps): TextMessageVO;
    get text(): string;
    protected validate({ text }: TextMessageProps): void;
}
