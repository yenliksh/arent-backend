import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { ContractChatModel } from '../models/contract.model';
export declare class ContractSubscriptionResponse {
    contract?: ContractChatModel;
    event: ContractPubSubEvent;
    error?: string;
    static create(props: ContractOrmEntity, contractPubSubEvent: ContractPubSubEvent, error?: string): ContractSubscriptionResponse;
}
