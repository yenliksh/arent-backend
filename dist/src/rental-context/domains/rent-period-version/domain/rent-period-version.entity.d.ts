import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export interface CreateRentPeriodVersionProps {
    version: number;
    shortTermRentMonth: number[];
    middleTermRentMonth: number[];
    longTermRentMonth: number[];
}
export declare type RentPeriodVersionProps = CreateRentPeriodVersionProps;
export declare class RentPeriodVersionEntity extends AggregateRoot<RentPeriodVersionProps> {
    protected readonly _id: UUID;
    static create({ shortTermRentMonth, middleTermRentMonth, longTermRentMonth, version, }: CreateRentPeriodVersionProps): RentPeriodVersionEntity;
    get id(): UUID;
    get shortTermRentMonth(): number[];
    get middleTermRentMonth(): number[];
    get longTermRentMonth(): number[];
    validate(): void;
}
