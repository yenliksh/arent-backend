import { DefaultTemplateProps } from '@modules/notifications/types';
interface TemplateProps {
    recipientName: string;
    buttonLink: string;
    isLandLord: boolean;
}
export declare const contractOfferStatusChangedTemplate: ({ recipientName, buttonLink, isLandLord, fbLink, instagramLink, linkedInLink, }: DefaultTemplateProps<TemplateProps>) => string;
export {};
