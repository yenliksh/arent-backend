import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
export declare class ApartmentAdLockedDatesModel {
    startDate: string;
    endDate: string;
    constructor(model: ApartmentAdLockedDatesModel);
    static create({ startDate, endDate }: ShortTermRentLockedDateOrmEntity): ApartmentAdLockedDatesModel;
}
