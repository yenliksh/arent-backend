import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UserMeModel } from '../models/user.model';
export declare class UserQueryGraphqlResolver {
    getMe(iam: UserOrmEntity): Promise<UserMeModel>;
}
