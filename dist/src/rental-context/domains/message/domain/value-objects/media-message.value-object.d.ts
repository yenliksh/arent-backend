import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface MediaMessageProps {
    fileKey: string;
    fileName: string;
    fileWeight: number;
}
export declare class MediaMessageVO extends ValueObject<MediaMessageProps> {
    constructor(props: MediaMessageProps);
    static create(props: MediaMessageProps): MediaMessageVO;
    get fileKey(): string;
    get fileName(): string;
    get fileWeight(): number;
    protected validate({ fileKey, fileName, fileWeight }: MediaMessageProps): void;
    static format(fileKey: string): string;
    static transform(props: MediaMessageProps): MediaMessageProps;
}
