export declare class LockedDateInput {
    startDate: string;
    endDate: string;
}
export declare class EditShortTermRentAvailabilitySettingsRequest {
    readonly id: string;
    readonly bookingAccessInMonths: number;
    readonly lockedDates: LockedDateInput[];
}
