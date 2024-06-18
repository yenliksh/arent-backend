import { ApartmentAdClusterInfoModel } from '@domains/apartment-ad/models/apartment-ad-cluster-info.model';
import { ApartmentAdClusterModel } from '@domains/apartment-ad/models/apartment-ad-cluster.model';
import { LongTermRentDocumentProps } from '@infrastructure/elastic-search/documents/long-term-rent.document';
import { ShortTermRentDocumentProps } from '@infrastructure/elastic-search/documents/short-term-rent.document';
import { SlugModel } from '@infrastructure/models/slug.model';
export declare class FindShortTermRentAdsClusterResponse {
    data: ApartmentAdClusterModel[];
    clusterInfo: ApartmentAdClusterInfoModel;
    slugs?: SlugModel[];
    static create: (data: (LongTermRentDocumentProps | ShortTermRentDocumentProps)[], totalItems: number, slugs?: SlugModel[]) => FindShortTermRentAdsClusterResponse;
}
