import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface IMedia {
    order: number;
    fileKey: string;
}
declare type IPhoto = IMedia;
declare type IVideo = IMedia;
interface MediaCreateProps {
    photos: string[];
    video?: string[];
}
export interface MediaProps {
    photos: IPhoto[];
    videos: IVideo[];
}
export declare class MediaVO extends ValueObject<MediaProps> {
    static create(props: MediaCreateProps): MediaVO;
    protected validate(props: MediaProps): void;
}
export {};
