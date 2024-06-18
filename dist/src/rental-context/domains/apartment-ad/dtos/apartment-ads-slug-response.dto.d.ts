import { ApartmentAdIdentificatorOrmEntity } from '@infrastructure/database/entities/apartment-ad-identificator.orm-entity';
import { SlugModel } from '@infrastructure/models/slug.model';
export declare class ApartmentAdsSlugResponse {
    slugs: SlugModel[];
    static create(props: {
        apAdIds: ApartmentAdIdentificatorOrmEntity[];
    }): ApartmentAdsSlugResponse;
}
