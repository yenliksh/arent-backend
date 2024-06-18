import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { CommandBus } from '@nestjs/cqrs';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { ContractsAdminService } from './contracts-admin.service';
import { ContractCancellationRequest } from './dtos/contract-cancellation.request.dto';
import { ContractTypeormEntity } from './entities/contract.typeorm-entity';
export declare class ContractsAdminController implements CrudController<ContractTypeormEntity> {
    service: ContractsAdminService;
    private commandBus;
    constructor(service: ContractsAdminService, commandBus: CommandBus);
    get base(): CrudController<ContractTypeormEntity>;
    getOne(req: CrudRequest): Promise<{
        cost: number;
        id: string;
        contractRequestId: string;
        rentPeriodVersionId: string;
        tenantId?: string | undefined;
        landlordId?: string | undefined;
        apartmentAdId?: string | undefined;
        apartmentRentPeriodType: import("../../../infrastructure/enums").ApartmentRentPeriodType;
        currency: import("../../../rental-context/domains/apartment-ad/domain/types").CurrencyType;
        status: import("../../../infrastructure/enums").ContractStatus;
        arrivalDate?: Date | undefined;
        departureDate?: Date | undefined;
        rules?: import("../../../rental-context/domain-value-objects/apartment-rules.value-object").ApartmentRulesProps | undefined;
        isPending: boolean;
        isFined: boolean;
        isTemporary: boolean;
        shortTermCancellationPolicy?: import("../../../infrastructure/enums").ShortTermRentCancellationPolicyType | undefined;
        longTermCancellationPolicy?: import("../../../infrastructure/enums").LongTermRentCancellationPolicyType | undefined;
        baseApartmentAdData: import("../../../rental-context/domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object").IBaseApartmentAdData;
        guests: import("../../../rental-context/domain-value-objects/apartment-guests.value-object").IGuests;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | undefined;
    } | undefined>;
    getMany(req: CrudRequest): Promise<ContractTypeormEntity[] | {
        data: ContractTypeormEntity[];
        count: number;
        total: number;
        page: number;
        pageCount: number;
    } | undefined>;
    cancel(input: ContractCancellationRequest, contractId: string): Promise<ContractOrmEntity | undefined>;
}
