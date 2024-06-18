import { IMedia } from '../../domain/value-objects/media.value-object';
export declare class ApartmentAdMediaModel {
    order: number;
    fileKey: string;
    constructor(model: ApartmentAdMediaModel);
    static create({ order, fileKey }: IMedia): ApartmentAdMediaModel;
}
