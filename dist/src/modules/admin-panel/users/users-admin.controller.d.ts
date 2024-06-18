import { CommandBus } from '@nestjs/cqrs';
import { CrudController, CrudRequest } from '@nestjsx/crud';
import { AdminProfileEditUserInfoDto } from './dtos/admin-profile-edit.dto';
import { UserTypeormEntity } from './entities/user.typeorm-entity';
import { UsersAdminService } from './users-admin.service';
export declare class UsersAdminController implements CrudController<UserTypeormEntity> {
    service: UsersAdminService;
    private commandBus;
    constructor(service: UsersAdminService, commandBus: CommandBus);
    get base(): CrudController<UserTypeormEntity>;
    getOne(req: CrudRequest): Promise<{
        avatarKey: string | undefined;
        identityDocuments: string[] | undefined;
        id: string;
        phone: string;
        email: string;
        firstName: string;
        isEmailVerified: boolean;
        lastName: string;
        middleName?: string | undefined;
        birthDate: string;
        gender?: import("../../../rental-context/domains/user/domain/types").GenderType | undefined;
        guarantors: import("./types").Guarantor[];
        emailNotification: import("../../../rental-context/domains/user/domain/value-objects/notifications/user-email-notification.value-object").UserEmailNotificationProps;
        pushNotification: import("../../../rental-context/domains/user/domain/value-objects/notifications/user-push-notification.value-object").UserPushNotificationProps;
        smsNotification: import("../../../rental-context/domains/user/domain/value-objects/notifications/user-sms-notification.value-object").UserSmsNotificationProps;
        identityStatus: import("../../../rental-context/domains/user/domain/types").IdentityStatusType;
        identityRejectReason?: string | undefined;
        identityUpdatedAt: Date;
        isPhoneApproved: boolean;
        numberFines: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date | undefined;
    } | undefined>;
    getMany(req: CrudRequest): Promise<UserTypeormEntity[] | {
        data: UserTypeormEntity[];
        count: number;
        total: number;
        page: number;
        pageCount: number;
    } | undefined>;
    editUserInfo(userId: string, dto: AdminProfileEditUserInfoDto): Promise<string>;
    deleteUser(userId: string): Promise<boolean>;
}
