import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UserMeModel } from '../models/user.model';
export declare class ProfileResponse {
    user: UserMeModel;
    static create(props: UserOrmEntity): ProfileResponse;
}
