import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { MyApartmentAdService } from '@domains/apartment-ad/queries/my-apartment-ad/my-apartment-ad.service';
import { ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';
import { ApartmentsTitleUpdateCommand } from './apartments-titles-update.command';
export declare class ApartmentsTitlesUpdateHandler implements ICommandHandler<ApartmentsTitleUpdateCommand> {
    private readonly findMyApartmentAdService;
    private readonly apartmentAdIdentificatorRepository;
    constructor(findMyApartmentAdService: MyApartmentAdService, apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository);
    execute(): Promise<Ok<boolean>>;
}
