export declare class InnopayPageUrlSubscriptionResponse {
    url: string;
    startUrlDate: string;
    contractId?: string;
    static create(url: string, startUrlDate: string, refs: {
        contractId?: string;
    }): InnopayPageUrlSubscriptionResponse;
}
