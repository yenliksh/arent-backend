import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubPayload, InnopayPageUrlPubSubPayload } from '@modules/graphql-subscriptions/types';
import { Resolver, Subscription } from '@nestjs/graphql';
import { I18nService } from 'nestjs-i18n';

import { ContractExceptions } from '../bulls/types';
import { ContractSubscriptionResponse } from '../dtos/contract.subscription.response.dto';
import { InnopayPageUrlSubscriptionResponse } from '../dtos/innopay-page-url.subscription.response.dto';

@Resolver()
export class ContractSubscriptionResolver {
  constructor(private readonly pubSubService: PubSubService) {}

  @Subscription(() => ContractSubscriptionResponse, {
    name: PubSubTrigger.UPDATE_CONTRACT,
    filter: (payload: ContractPubSubPayload, _, context) =>
      [payload.contract.landlordId, payload.contract.tenantId].includes(context.user.id),
    resolve: async (payload: ContractPubSubPayload, _, context) => {
      const i18nService = context.i18nService as I18nService;
      const error =
        payload.error && Object.values(ContractExceptions).includes(payload.error)
          ? i18nService.t('contract-exceptions.' + payload.error)
          : payload.error;

      return ContractSubscriptionResponse.create(payload.contract, payload.event, error);
    },
  })
  updateContract() {
    return this.pubSubService.asyncIterator(PubSubTrigger.UPDATE_CONTRACT);
  }

  @Subscription(() => InnopayPageUrlSubscriptionResponse, {
    name: PubSubTrigger.INNOPAY_PAGE_URL,
    filter: (payload: InnopayPageUrlPubSubPayload, _, context) => payload.payingId === context.user.id,
    resolve: (payload: InnopayPageUrlPubSubPayload) =>
      InnopayPageUrlSubscriptionResponse.create(payload.url, payload.startUrlDate.toISOString(), {
        contractId: payload.contractId,
      }),
  })
  innopayPageUrl() {
    return this.pubSubService.asyncIterator(PubSubTrigger.INNOPAY_PAGE_URL);
  }
}
