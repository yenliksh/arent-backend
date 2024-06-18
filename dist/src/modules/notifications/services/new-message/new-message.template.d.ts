import { DefaultTemplateProps } from '@modules/notifications/types';
interface TemplateProps {
    recipientName: string;
    buttonLink: string;
    senderName: string;
}
export declare const newMessageTemplate: ({ recipientName, senderName, buttonLink, fbLink, instagramLink, linkedInLink, }: DefaultTemplateProps<TemplateProps>) => string;
export {};
