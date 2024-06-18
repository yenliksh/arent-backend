import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { MyApartmentAdService } from '@domains/apartment-ad/queries/my-apartment-ad/my-apartment-ad.service';
import { getConvertedSlug } from '@libs/utils/get-converted-slug';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';

import { ApartmentsTitleUpdateCommand } from './apartments-titles-update.command';

@CommandHandler(ApartmentsTitleUpdateCommand)
export class ApartmentsTitlesUpdateHandler implements ICommandHandler<ApartmentsTitleUpdateCommand> {
  constructor(
    private readonly findMyApartmentAdService: MyApartmentAdService,
    private readonly apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository,
  ) {}

  public async execute(): Promise<Ok<boolean>> {
    const allApartments = await this.findMyApartmentAdService.handleAll();

    if (allApartments.isErr()) {
      throw allApartments.unwrapErr();
    }

    const allApartmentsArray = allApartments.unwrap();

    if (allApartmentsArray.length < 1) return Ok(true);

    allApartmentsArray.forEach(async (ap) => {
      if (ap.description) {
        const apartmentIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(ap.id);
        const apartmentIdentificatorProps = apartmentIdentificator?.getPropsCopy();
        const convertedTitle = getConvertedSlug(ap.description.name);
        const slug = `${apartmentIdentificatorProps?.adSearchId}-${convertedTitle}`;
        await this.apartmentAdIdentificatorRepository.updateByApartmentId(ap.id, ap.description.name, slug);
      }
    });

    return Ok(true);
  }
}
