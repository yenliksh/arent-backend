import { CommandBus } from '@nestjs/cqrs';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { UserIdentityRejectDto } from './dtos';
import { UserIdentityRequestTypeormEntity } from './entities/user-identity-request.typeorm-entity';
import { UserIdentityRequestsAdminService } from './user-identity-requests-admin.service';
export declare class UserIdentityRequestsAdminController implements CrudController<UserIdentityRequestTypeormEntity> {
    service: UserIdentityRequestsAdminService;
    private commandBus;
    constructor(service: UserIdentityRequestsAdminService, commandBus: CommandBus);
    get base(): CrudController<UserIdentityRequestTypeormEntity>;
    getOne(req: CrudRequest): Promise<{
        avatarKey: string | undefined;
        identityDocuments: string[] | undefined;
        id: string;
        firstName: string;
        isEmailVerified: boolean;
        lastName: string;
        middleName?: string | undefined;
        email: string;
        birthDate: string;
        guarantors?: import("../../../rental-context/domains/user/domain/value-objects/guarantor.value-object").GuarantorProps[] | undefined;
        emailNotification: import("../../../rental-context/domains/user/domain/value-objects/notifications/user-email-notification.value-object").UserEmailNotificationProps;
        smsNotification: import("../../../rental-context/domains/user/domain/value-objects/notifications/user-sms-notification.value-object").UserSmsNotificationProps;
        pushNotification: import("../../../rental-context/domains/user/domain/value-objects/notifications/user-push-notification.value-object").UserPushNotificationProps;
        gender?: import("../../../rental-context/domains/user/domain/types").GenderType | undefined;
        identityStatus: import("../../../rental-context/domains/user/domain/types").IdentityStatusType;
        identityRejectReason?: string | undefined;
        identityUpdatedAt: Date;
        phone: string;
        numberFines: number;
        isPhoneApproved: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | undefined;
    } | undefined>;
    getMany(req: CrudRequest): Promise<UserIdentityRequestTypeormEntity[] | {
        data: UserIdentityRequestTypeormEntity[];
        count: number;
        total: number;
        page: number;
        pageCount: number;
    } | undefined>;
    approve(userId: string): Promise<boolean>;
    reject(userId: string, dto: UserIdentityRejectDto): Promise<boolean>;
}
