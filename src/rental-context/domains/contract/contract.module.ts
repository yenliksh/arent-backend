import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { InnopayCardModule } from '@domains/innopay-card/innopay-card.module';
import { PaymentBullsModule } from '@domains/payment-transaction/bulls/payment-bulls.module';
import { GraphqlSubscriptionsModule } from '@modules/graphql-subscriptions/graphql-subscriptions.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ContractBullsModule } from './bulls/contract-bulls.module';
import { AcceptContractOfferService } from './commands/accept-contract-offer/accept-contract-offer.service';
import { CancelConcludedContractHandler } from './commands/cancel-concluded-contract/cancel-concluded-contract.handler';
import { CancelContractByAdminHandler } from './commands/cancel-contract-by-admin/cancel-contract-by-admin.handler';
import { CancelContractByTenantService } from './commands/cancel-contract-by-tenant/cancel-contract-by-tenant.service';
import { ChangeTenantPaymentMethodService } from './commands/change-tenant-payment-method/change-tenant-payment-method.service';
import { ContractTemporaryConcludeService } from './commands/contract-temporary-conclude/contract-temporary-conclude.service';
import { ContractTemporaryInstantConcludeService } from './commands/contract-temporary-instant-conclude/contract-temporary-instant-conclude.service';
import { CreateContractAfterRequestHandler } from './commands/create-contract-after-request/create-contract-after-request.handler';
import { CreateInstantContractHandler } from './commands/create-instant-booking-contract/create-instant-booking-contract.handler';
import { ModifyContractToPermanentHandler } from './commands/modify-contract-to-permanent/modify-contract-to-permanent.handler';
import { RejectContractOfferService } from './commands/reject-contract-offer/reject-contract-offer.service';
import { RejectIntersectedContractsHandler } from './commands/reject-intersected-contracts/reject-intersected-contracts.handler';
import { RevokeTemporaryContractHandler } from './commands/revoke-temporary-contract/revoke-temporary-contract.handler';
import { SendContractOfferEmailService } from './commands/send-contract-offer-email/send-contract-offer-email.service';
import { SendContractOfferStatusEmailService } from './commands/send-contract-offer-status-email/send-contract-offer-status-email.service';
import { SendContractOfferService } from './commands/send-contract-offer/send-contract-offer.service';
import { UpdateContractPaymentTransactionHandler } from './commands/update-contract-payment-transaction/update-contract-payment-transaction.handler';
import { ContractCronModule } from './cron/contract-cron.module';
import { PaymentTransactionListener } from './domain/events/payment-transaction.listener';
import { FindContractService } from './queries/find-contract/find-contract.service';
import { LandlordActiveRentContractsService } from './queries/landlord-active-rent-contracts/landlord-active-rent-contracts.service';
import { LandlordContractService } from './queries/landlord-contract/landlord-contract.service';
import { TenantContractCancelationInfoService } from './queries/tenant-contract-cancelation-info/tenant-contract-cancelation-info.service';
import { TenantContractPaymentInfoService } from './queries/tenant-contract-payment-info/tenant-contract-payment-info.service';
import { TenantContractService } from './queries/tenant-contract/tenant-contract.service';
import { TenantLongTermRentContractsService } from './queries/tenant-long-term-rent-contracts/tenant-long-term-rent-contracts.service';
import { TenantShortTermRentContractsService } from './queries/tenant-short-term-rent-contracts/tenant-short-term-rent-contracts.service';
import { ContractMutationGraphqlResolver } from './resolvers/contract.mutation.resolver';
import { ContractQueryGraphqlResolver } from './resolvers/contract.query.resolver';
import { ContractSubscriptionResolver } from './resolvers/contract.subscription.resolver';
import { ContractChatResolver } from './resolvers/contract/contract-chat.resolver';
import { ContractLandlordResolver } from './resolvers/contract/contract-landlord.resolver';
import { ContractTenantResolver } from './resolvers/contract/contract-tenant.resolver';

const graphqlResolvers = [
  ContractMutationGraphqlResolver,
  ContractQueryGraphqlResolver,
  ContractLandlordResolver,
  ContractTenantResolver,
  ContractChatResolver,
  ContractSubscriptionResolver,
];

const commands = [
  SendContractOfferService,
  AcceptContractOfferService,
  RejectContractOfferService,
  TenantContractService,
  LandlordContractService,
  ChangeTenantPaymentMethodService,
  CreateContractAfterRequestHandler,
  TenantContractPaymentInfoService,
  UpdateContractPaymentTransactionHandler,
  CancelConcludedContractHandler,
  CancelContractByTenantService,
  CancelContractByAdminHandler,
  ContractTemporaryConcludeService,
  CreateInstantContractHandler,
  RevokeTemporaryContractHandler,
  ModifyContractToPermanentHandler,
  ContractTemporaryInstantConcludeService,
  RejectIntersectedContractsHandler,
  SendContractOfferStatusEmailService,
  SendContractOfferEmailService,
];

const queries = [
  FindContractService,
  LandlordActiveRentContractsService,
  TenantLongTermRentContractsService,
  TenantShortTermRentContractsService,
  TenantContractCancelationInfoService,
];

const listeners = [PaymentTransactionListener];

@Module({
  imports: [
    GraphqlSubscriptionsModule,
    CqrsModule,
    RentalContextDomainRepositoriesModule,
    ContractBullsModule,
    PaymentBullsModule,
    ContractCronModule,
    InnopayCardModule,
  ],
  providers: [...graphqlResolvers, ...commands, ...queries, ...listeners],
})
export class ContractModule {}
