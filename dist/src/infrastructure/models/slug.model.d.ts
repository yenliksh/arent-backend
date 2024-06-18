export declare class SlugModel {
    id: string;
    slug?: string;
    apartmentId?: string;
    static create({ id, slug, apartmentId }: SlugModel): SlugModel;
}
