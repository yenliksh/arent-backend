import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
declare type ApartmentAdDetailsModelCreateProps = Required<Pick<ApartmentAdOrmEntity, 'numberOfGuests' | 'numberOfRooms'>>;
export declare class ApartmentAdDetailsModel {
    numberOfGuests: number;
    numberOfRooms: number;
    constructor(model: ApartmentAdDetailsModel);
    static create(props: ApartmentAdDetailsModelCreateProps): ApartmentAdDetailsModel;
    static getDetailsProps({ numberOfGuests, numberOfRooms, }: Partial<ApartmentAdDetailsModelCreateProps>): ApartmentAdDetailsModelCreateProps | undefined;
}
export {};
