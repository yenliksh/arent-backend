import { CommandBus } from '@nestjs/cqrs';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { ShortTermRentTypeormEntity } from './entities/short-term-rent.typeorm-entity';
import { ShortTermRentAdminService } from './short-term-rent-admin.service';
export declare class ShortTermRentAdminController implements CrudController<ShortTermRentTypeormEntity> {
    service: ShortTermRentAdminService;
    private commandBus;
    constructor(service: ShortTermRentAdminService, commandBus: CommandBus);
    get base(): CrudController<ShortTermRentTypeormEntity>;
    getOne(req: CrudRequest): Promise<{
        cost: number;
        id: string;
        currency: import("../../../rental-context/domains/apartment-ad/domain/types").CurrencyType;
        status: import("../../../rental-context/domains/apartment-ad/domain/types").ApartmentAdStatusType[];
        isApproved: boolean;
        declineReason?: string | undefined;
        apartmentAdId: string;
        rentBookingType: import("@infrastructure/enums").ShortTermRentBookingType;
        cancellationPolicy?: import("@infrastructure/enums").ShortTermRentCancellationPolicyType | undefined;
        arrivalTime?: string | undefined;
        departureTime?: string | undefined;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | undefined;
        apartmentAd?: import("../apartment-ads/entities/apartment-ad.typeorm-entity").ApartmentAdTypeormEntity | undefined;
    } | undefined>;
    getMany(req: CrudRequest): Promise<ShortTermRentTypeormEntity[] | {
        data: ShortTermRentTypeormEntity[];
        count: number;
        total: number;
        page: number;
        pageCount: number;
    } | undefined>;
    pause(apartmentId: string): Promise<string>;
    publish(apartmentId: string): Promise<string>;
}
