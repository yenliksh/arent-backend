import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubPayload, InnopayPageUrlPubSubPayload } from '@modules/graphql-subscriptions/types';
export declare class ContractSubscriptionResolver {
    private readonly pubSubService;
    constructor(pubSubService: PubSubService);
    updateContract(): AsyncIterator<ContractPubSubPayload, any, undefined>;
    innopayPageUrl(): AsyncIterator<InnopayPageUrlPubSubPayload, any, undefined>;
}
