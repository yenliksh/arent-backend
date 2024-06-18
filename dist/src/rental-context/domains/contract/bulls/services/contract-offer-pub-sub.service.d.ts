import { ChatEntity } from '@domains/chat/domain/entities/chat.entity';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { MessageEntity } from '@domains/message/domain/entities/message.entity';
import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { ConfigService } from '@nestjs/config';
import { ContractExceptions } from '../types';
export declare class ContractOfferPubSubService {
    private readonly pubSubService;
    private readonly configService;
    private isProd;
    constructor(pubSubService: PubSubService, configService: ConfigService);
    publishMessage(message: MessageEntity, chat: ChatEntity): Promise<void>;
    publishContract(contract: ContractEntity, event: ContractPubSubEvent, error?: ContractExceptions): Promise<void>;
    publishInnopayPageUrl(payingId: string, url: string, startUrlDate: string, refs: {
        contractId?: string;
    }): Promise<void>;
}
