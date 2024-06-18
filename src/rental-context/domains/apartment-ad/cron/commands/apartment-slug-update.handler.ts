import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { CreateApartmentAdIdentificatorService } from '@domains/apartment-ad/commands/create-apartment-ad-identificator/create-apartment-ad-identificator.service';
import { MyApartmentAdService } from '@domains/apartment-ad/queries/my-apartment-ad/my-apartment-ad.service';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { getConvertedSlug } from '@libs/utils/get-converted-slug';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';

import { ApartmentSlugUpdateCommand } from './apartment-slug-update.command';

@CommandHandler(ApartmentSlugUpdateCommand)
export class ApartmentSlugUpdateHandler implements ICommandHandler<ApartmentSlugUpdateCommand> {
  constructor(
    private readonly findMyApartmentAdService: MyApartmentAdService,
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
    private readonly createApartmentAdIdentificatorService: CreateApartmentAdIdentificatorService,
  ) {}

  public async execute(command: ApartmentSlugUpdateCommand): Promise<Ok<boolean>> {
    const { apartmentAdId } = command;
    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);

    if (!apartmentAd) return Ok(false);

    const apartmentOrm = (await this.findMyApartmentAdService.handleById(apartmentAd.id.value)).unwrap();
    if (!apartmentOrm) return Ok(false);

    await this.apartmentAdIdentificatorRepository.deleteByApartmentId(apartmentOrm.id);

    if (apartmentOrm.description)
      await this.createApartmentAdIdentificatorService.handle({
        apartmentId: apartmentOrm.id,
        titleSeo: apartmentOrm.description.name,
      });

    const apartmentIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(apartmentOrm.id);

    const apartmentSeoProps = apartmentIdentificator?.getPropsCopy();

    const convertedTitle = getConvertedSlug(apartmentSeoProps?.titleSeo || '');

    const slug = `${apartmentSeoProps?.adSearchId}-${convertedTitle}`;

    if (
      apartmentIdentificator &&
      apartmentAd &&
      apartmentAd.isLongTermRent &&
      (apartmentAd.longTermRentStatus?.isPublished || apartmentAd.longTermRentStatus?.isPaused)
    ) {
      await this.longTermRentDocumentRepository.delete(apartmentAd);
      await this.longTermRentDocumentRepository.save(apartmentAd, slug);
    }
    if (
      apartmentIdentificator &&
      apartmentAd &&
      apartmentAd?.isShortTermRent &&
      (apartmentAd?.shortTermRentStatus?.isPublished || apartmentAd?.shortTermRentStatus?.isPaused)
    ) {
      await this.shortTermRentDocumentRepository.delete(apartmentAd);
      await this.shortTermRentDocumentRepository.save(apartmentAd, slug);
    }

    return Ok(true);
  }
}
