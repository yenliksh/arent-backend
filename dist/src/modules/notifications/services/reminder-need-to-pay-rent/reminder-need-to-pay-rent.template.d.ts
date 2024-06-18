import { DefaultTemplateProps } from '@modules/notifications/types';
interface TemplateProps {
    recipientName: string;
    buttonLink: string;
    withdrawFundsDate: string;
    paymentAmount: number;
    address: string;
    currency: string;
}
export declare const reminderNeedToPayRentTemplate: ({ recipientName, buttonLink, address, paymentAmount, withdrawFundsDate, currency, fbLink, instagramLink, linkedInLink, }: DefaultTemplateProps<TemplateProps>) => string;
export {};
