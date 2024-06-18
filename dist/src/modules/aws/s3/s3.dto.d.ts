import { FileCategory } from '@infrastructure/enums';
export declare class GetSignedUrlDto {
    fileName: string;
    fileCategory: FileCategory;
    apartmentAdId?: string;
    chatId?: string;
}
export declare class DeleteFromS3Dto {
    fileCategory: FileCategory;
    fileKey: string;
}
