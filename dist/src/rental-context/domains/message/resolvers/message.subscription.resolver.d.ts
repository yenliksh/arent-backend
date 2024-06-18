import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { MessagePubSubPayload } from '@modules/graphql-subscriptions/types';
import { UserChatRole } from 'src/rental-context/domains/chat/domain/types';
export declare class MessageSubscriptionResolver {
    private readonly pubSubService;
    constructor(pubSubService: PubSubService);
    newMessage(_userChatRole: UserChatRole): AsyncIterator<MessagePubSubPayload, any, undefined>;
}
