import { ApartmentAdModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { LongTermRentIsRentedProblem } from '@domains/apartment-ad/problems/long-term-rent-is-rented.problem';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
export declare class PublishApartmentAdResponse extends ProblemResponse {
    apartmentAd?: ApartmentAdModel;
    problem?: LongTermRentIsRentedProblem;
    static create(props: ApartmentAdOrmEntity): PublishApartmentAdResponse;
}
