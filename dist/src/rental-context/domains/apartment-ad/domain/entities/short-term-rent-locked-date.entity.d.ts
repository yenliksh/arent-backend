import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { DateISOVO } from '@libs/ddd/domain/value-objects/iso-date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export interface LockedDateProps {
    shortTermRentId: UUID;
    startDate: DateISOVO;
    endDate: DateISOVO;
}
export interface LockedDateCreateProps {
    shortTermRentId: string;
    startDate: string;
    endDate: string;
}
export declare class ShortTermRentLockedDateEntity extends Entity<LockedDateProps> {
    protected readonly _id: UUID;
    static create({ shortTermRentId, startDate, endDate }: LockedDateCreateProps): ShortTermRentLockedDateEntity;
    values(): {
        id: UUID;
        shortTermRentId: UUID;
        startDate: DateISOVO;
        endDate: DateISOVO;
        createdAt: import("../../../../../libs/ddd/domain/value-objects/date.value-object").DateVO;
        updatedAt: import("../../../../../libs/ddd/domain/value-objects/date.value-object").DateVO;
        deletedAt: import("../../../../../libs/ddd/domain/value-objects/date.value-object").DateVO | null;
    };
    validate(): void;
}
