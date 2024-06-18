import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UserMeModel } from '../models/user.model';
export declare class UserMeResponse {
    user: UserMeModel;
    static create(props: UserOrmEntity): UserMeResponse;
}
