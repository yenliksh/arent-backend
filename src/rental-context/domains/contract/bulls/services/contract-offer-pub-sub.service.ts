import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { MessageOrmMapper } from '@domain-repositories/message/message.orm-mapper';
import { ChatEntity } from '@domains/chat/domain/entities/chat.entity';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { MessageEntity } from '@domains/message/domain/entities/message.entity';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent } from '@modules/graphql-subscriptions/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ContractExceptions } from '../types';

@Injectable()
export class ContractOfferPubSubService {
  private isProd: boolean;

  constructor(private readonly pubSubService: PubSubService, private readonly configService: ConfigService) {
    this.isProd = this.configService.get<string>('nodeEnv') === 'production';
  }

  async publishMessage(message: MessageEntity, chat: ChatEntity) {
    const { members } = chat;

    const mapper = new MessageOrmMapper(MessageEntity);
    const ormMessage = await mapper.toOrmEntity(message);

    await this.pubSubService.publish(PubSubTrigger.NEW_MESSAGE, {
      message: ormMessage,
      chatMembers: members
        .map((member) => ({ [member.memberId.value]: member.role }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    });
  }

  async publishContract(contract: ContractEntity, event: ContractPubSubEvent, error?: ContractExceptions) {
    const mapper = new ContractOrmMapper(ContractEntity);
    const ormContract = await mapper.toOrmEntity(contract);

    await this.pubSubService.publish(PubSubTrigger.UPDATE_CONTRACT, {
      contract: ormContract,
      event,
      error: this.isProd ? undefined : error,
    });
  }

  async publishInnopayPageUrl(payingId: string, url: string, startUrlDate: string, refs: { contractId?: string }) {
    await this.pubSubService.publish(PubSubTrigger.INNOPAY_PAGE_URL, {
      payingId,
      url,
      startUrlDate: new Date(startUrlDate),
      ...refs,
    });
  }
}
