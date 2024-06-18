import { TimeInterval } from '@domains/apartment-ad/types';
export declare class ApartmentAdTimeIntervalModel {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    constructor(model: ApartmentAdTimeIntervalModel);
    static create(data?: TimeInterval): ApartmentAdTimeIntervalModel;
}
