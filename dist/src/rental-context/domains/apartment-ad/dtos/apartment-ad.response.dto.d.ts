import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ApartmentAdModel } from '../models/apartment-ad.model';
export declare class ApartmentAdResponse {
    apartmentAd: ApartmentAdModel;
    static create(props: ApartmentAdOrmEntity): ApartmentAdResponse;
}
