import { CommandBus } from '@nestjs/cqrs';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { LongTermRentTypeormEntity } from './entities/long-term-rent.typeorm-entity';
import { LongTermRentAdminService } from './long-term-rent-admin.service';
export declare class LongTermRentAdminController implements CrudController<LongTermRentTypeormEntity> {
    service: LongTermRentAdminService;
    private commandBus;
    constructor(service: LongTermRentAdminService, commandBus: CommandBus);
    get base(): CrudController<LongTermRentTypeormEntity>;
    getOne(req: CrudRequest): Promise<{
        cost: number;
        ownershipDocuments: string[] | undefined;
        id: string;
        currency: import("../../../rental-context/domains/apartment-ad/domain/types").CurrencyType;
        status: import("../../../rental-context/domains/apartment-ad/domain/types").ApartmentAdStatusType[];
        isApproved: boolean;
        declineReason?: string | undefined;
        apartmentAdId: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | undefined;
        apartmentAd?: import("../apartment-ads/entities/apartment-ad.typeorm-entity").ApartmentAdTypeormEntity | undefined;
    } | undefined>;
    getMany(req: CrudRequest): Promise<LongTermRentTypeormEntity[] | {
        data: LongTermRentTypeormEntity[];
        count: number;
        total: number;
        page: number;
        pageCount: number;
    } | undefined>;
    pause(apartmentId: string): Promise<string>;
    publish(apartmentId: string): Promise<string>;
}
