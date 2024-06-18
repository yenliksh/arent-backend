import { CrudController, CrudRequest } from '@nestjsx/crud';
import { MessageTypeormEntity } from './entities/message.typeorm-entity';
import { MessagesAdminService } from './messages-admin.service';
export declare class MessagesAdminController implements CrudController<MessageTypeormEntity> {
    service: MessagesAdminService;
    constructor(service: MessagesAdminService);
    get base(): CrudController<MessageTypeormEntity>;
    getOne(req: CrudRequest): Promise<{
        contractData: {
            cost: number | undefined;
            arrivalDate?: string | undefined;
            departureDate?: string | undefined;
            transactionsMeta?: import("../../../rental-context/domains/message/domain/types").ISystemMessagePaymentTransactionMeta[] | undefined;
            rules?: import("../../../rental-context/domain-value-objects/apartment-rules.value-object").ApartmentRulesProps | undefined;
            shortTermRentCancellationPolicyType?: import("../../../infrastructure/enums").ShortTermRentCancellationPolicyType | undefined;
            longTermRentCancellationPolicyType?: import("../../../infrastructure/enums").LongTermRentCancellationPolicyType | undefined;
            apartmentRentPeriodType?: import("../../../infrastructure/enums").ApartmentRentPeriodType | undefined;
            comment?: string | undefined;
            status: import("../../../infrastructure/enums").ContractStatus;
            shortTermRentBookingType?: import("../../../infrastructure/enums").ShortTermRentBookingType | undefined;
            shortTermRentPaymentType?: import("../../../infrastructure/enums").ShortTermRentPaymentType | undefined;
        } | undefined;
        fileKey: string | undefined;
        id: string;
        chatId: string;
        senderId: string;
        type: import("../../../rental-context/domains/message/domain/types").MessageType;
        status: import("../../../rental-context/domains/message/domain/types").MessageStatus;
        text?: string | null | undefined;
        fileName?: string | null | undefined;
        fileWeight?: number | null | undefined;
        systemMessageType?: import("../../../rental-context/domains/message/domain/types").SystemMessageType | null | undefined;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | undefined;
    } | undefined>;
    getMany(req: CrudRequest): Promise<MessageTypeormEntity[] | {
        data: MessageTypeormEntity[];
        count: number;
        total: number;
        page: number;
        pageCount: number;
    } | undefined>;
}
