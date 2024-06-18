import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { Ok } from 'oxide.ts';
import { ApartmentAdStatusType } from 'src/rental-context/domains/apartment-ad/domain/types';
export declare type StatusCountResult = {
    [P in ApartmentAdStatusType]: number;
};
export declare class MyApartmentAdStatusCountService {
    handle(userId: UserOrmEntity['id']): Promise<Ok<StatusCountResult>>;
}
