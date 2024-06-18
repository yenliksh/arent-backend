import { DefaultTemplateProps } from '@modules/notifications/types';
interface TemplateProps {
    recipientName: string;
    buttonLink: string;
    withdrawFundsDate: string;
    paymentAmount: string;
    address: string;
    startDate: string;
    endDate: string;
}
export declare const recurringPaymentWithdrawSuccessTemplate: ({ recipientName, buttonLink, withdrawFundsDate, paymentAmount, address, startDate, endDate, fbLink, instagramLink, linkedInLink, }: DefaultTemplateProps<TemplateProps>) => string;
export {};
