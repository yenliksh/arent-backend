import { DefaultTemplateProps } from '@modules/notifications/types';
interface TemplateProps {
    recipientName: string;
    buttonLink: string;
    withdrawFundsDate: string;
    paymentAmount: string;
    address: string;
    startDate: string;
    endDate: string;
    currency: string;
}
export declare const contractConcludedTenantTemplate: ({ recipientName, buttonLink, withdrawFundsDate, paymentAmount, address, startDate, endDate, currency, fbLink, instagramLink, linkedInLink, }: DefaultTemplateProps<TemplateProps>) => string;
export {};
