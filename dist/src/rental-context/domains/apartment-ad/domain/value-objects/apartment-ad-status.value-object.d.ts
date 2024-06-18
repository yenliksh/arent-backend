import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ApartmentAdStatusType } from '../types';
interface ApartmentAdStatusCreateProps {
    statusType: ApartmentAdStatusType[];
    declineReason?: string | null;
}
export declare type ApartmentAdStatusProps = ApartmentAdStatusCreateProps;
export declare class ApartmentAdStatusVO extends ValueObject<ApartmentAdStatusProps> {
    static create({ statusType, declineReason }: ApartmentAdStatusCreateProps): ApartmentAdStatusVO;
    get statusType(): ApartmentAdStatusType[];
    get declineReason(): string | null | undefined;
    get isPublished(): boolean;
    get isProcessing(): boolean;
    get isPaused(): boolean;
    get isDraft(): boolean;
    protected validate(props: ApartmentAdStatusProps): void;
}
export {};
