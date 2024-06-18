import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { CommandBus } from '@nestjs/cqrs';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { ApartmentAdAdminService } from './apartment-ad-admin.service';
import { EditApartmentAdDescriptionDto } from './dtos/edit-apartment-ad-description.dto';
import { EditApartmentAdMetatagDto } from './dtos/edit-apartment-ad-metatag.dto';
import { ApartmentAdTypeormEntity } from './entities/apartment-ad.typeorm-entity';
export declare class ApartmentAdAdminController implements CrudController<ApartmentAdTypeormEntity> {
    service: ApartmentAdAdminService;
    private commandBus;
    constructor(service: ApartmentAdAdminService, commandBus: CommandBus);
    get base(): CrudController<ApartmentAdTypeormEntity>;
    getOne(req: CrudRequest): Promise<{
        shortTermRent: {
            cost: number;
            id: string;
            currency: import("../../../rental-context/domains/apartment-ad/domain/types").CurrencyType;
            status: import("../../../rental-context/domains/apartment-ad/domain/types").ApartmentAdStatusType[];
            isApproved: boolean;
            declineReason?: string | undefined;
            apartmentAdId: string;
            rentBookingType: import("../../../infrastructure/enums").ShortTermRentBookingType;
            cancellationPolicy?: import("../../../infrastructure/enums").ShortTermRentCancellationPolicyType | undefined;
            arrivalTime?: string | undefined;
            departureTime?: string | undefined;
            createdAt: Date;
            updatedAt: Date;
            deletedAt?: Date | undefined;
            apartmentAd?: ApartmentAdTypeormEntity | undefined;
        } | undefined;
        longTermRent: {
            cost: number;
            id: string;
            currency: import("../../../rental-context/domains/apartment-ad/domain/types").CurrencyType;
            status: import("../../../rental-context/domains/apartment-ad/domain/types").ApartmentAdStatusType[];
            isApproved: boolean;
            declineReason?: string | undefined;
            ownershipDocuments?: string[] | undefined;
            apartmentAdId: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt?: Date | undefined;
            apartmentAd?: ApartmentAdTypeormEntity | undefined;
        } | undefined;
        media: {
            photos: {
                order: number;
                fileKey: string;
            }[] | undefined;
            videos: {
                order: number;
                fileKey: string;
            }[] | undefined;
        };
        id: string;
        landlordId: string;
        landlord: import("../users/entities/user.typeorm-entity").UserTypeormEntity;
        rentPeriodType: import("../../../rental-context/domains/apartment-ad/domain/types").RentPeriodType;
        apartmentType: import("../../../rental-context/domains/apartment-ad/domain/types").ApartmentType;
        apartmentCategory: import("../../../rental-context/domains/apartment-ad/domain/types").ApartmentCategory;
        numberOfGuests?: number | undefined;
        numberOfRooms?: number | undefined;
        country?: string | undefined;
        city?: string | undefined;
        street?: string | undefined;
        region?: string | undefined;
        houseNumber?: string | undefined;
        lat?: number | undefined;
        lng?: number | undefined;
        description?: import("../../../rental-context/domains/apartment-ad/domain/value-objects/apartment-ad-description.value-object").ApartmentAdDescriptionProps | undefined;
        rules?: import("../../../rental-context/domain-value-objects/apartment-rules.value-object").ApartmentRulesProps | undefined;
        characteristics?: import("../../../rental-context/domain-value-objects/apartment-characteristics.value-object").ApartmentAdCharacteristicsProps | undefined;
        legalCapacityType: import("../../../rental-context/domains/apartment-ad/domain/types").LegalCapacityType;
        legalCapacityTinBin?: string | undefined;
        legalCapacityCompanyName?: string | undefined;
        legalCapacityAddress?: string | undefined;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | undefined;
    } | undefined>;
    getMany(req: CrudRequest): Promise<ApartmentAdTypeormEntity[] | {
        data: ApartmentAdTypeormEntity[];
        count: number;
        total: number;
        page: number;
        pageCount: number;
    } | undefined>;
    editDescription(apartmentId: string, dto: EditApartmentAdDescriptionDto): Promise<string>;
    deleteApartmentAd(apartmentId: string): Promise<boolean>;
    editMetaTags(apartmentId: string, dto: EditApartmentAdMetatagDto): Promise<string>;
    getMetaTags(apartmentId: string): Promise<ApartmentAdIdentificatorEntity>;
    updateSlug(apartmentId: string): Promise<boolean>;
    updateTitles(): Promise<boolean>;
}
