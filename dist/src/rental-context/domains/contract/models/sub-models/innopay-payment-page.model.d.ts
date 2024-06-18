import { InnopayPaymentPageData } from '@domains/contract/domain/types';
export declare class InnopayPaymentPageModel {
    url: string;
    startAt: string;
    static create(props: InnopayPaymentPageData): InnopayPaymentPageModel;
}
