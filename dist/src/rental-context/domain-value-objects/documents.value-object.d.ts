import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface DocumentsProps {
    fileKeys: string[];
}
export declare class DocumentsVO extends ValueObject<DocumentsProps> {
    constructor(props: DocumentsProps);
    get fileKeys(): string[];
    protected validate({ fileKeys }: DocumentsProps): void;
    static format(fileKeys: string[]): string[];
    static transform(props: DocumentsProps): DocumentsProps;
}
