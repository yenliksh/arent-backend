import { DefaultTemplateProps } from '@modules/notifications/types';
interface TemplateProps {
    recipientName: string;
    buttonLink: string;
}
export declare const apartmentAdRejectedTemplate: ({ recipientName, buttonLink, fbLink, instagramLink, linkedInLink, }: DefaultTemplateProps<TemplateProps>) => string;
export {};
