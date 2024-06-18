import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
interface ArrivalAndDepartureTimeCreateProps {
    arrivalTime: string;
    departureTime: string;
}
export declare type ArrivalAndDepartureTimeProps = ArrivalAndDepartureTimeCreateProps;
export declare class ArrivalAndDepartureTimeVO extends ValueObject<ArrivalAndDepartureTimeProps> {
    static create({ arrivalTime, departureTime }: ArrivalAndDepartureTimeCreateProps): ArrivalAndDepartureTimeVO;
    get arrivalTime(): string;
    get departureTime(): string;
    protected validate(props: ArrivalAndDepartureTimeProps): void;
}
export {};
