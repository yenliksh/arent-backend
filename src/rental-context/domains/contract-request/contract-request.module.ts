import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { ContractBullsModule } from '@domains/contract/bulls/contract-bulls.module';
import { UnitOfWorkModule } from '@infrastructure/database/unit-of-work/unit-of-work.module';
import { GraphqlSubscriptionsModule } from '@modules/graphql-subscriptions/graphql-subscriptions.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AcceptRequestService } from './commands/accept-request/accept-request.service';
import { RejectRequestService } from './commands/reject-request/reject-request.service';
import { SendRequestEmailService } from './commands/send-request-email/send-request-email.service';
import { SendBookingRequestStatusEmailService } from './commands/send-request-status-email/send-request-status-email.service';
import { SendRequestService } from './commands/send-request/send-request.service';
import { FindContractRequestForLandlordService } from './queries/find-contract-request-for-landlord/find-contract-request-for-landlord.service';
import { FindContractRequestService } from './queries/find-contract-request/find-contract-request.service';
import { ContractRequestMutationGraphqlResolver } from './resolvers/contract-request.mutation.resolver';
import { ContractRequestQueryGraphqlResolver } from './resolvers/contract-request.query.resolver';
import { ContractRequestGraphqlResolver } from './resolvers/contract-request.resolver';

const graphqlResolvers = [
  ContractRequestMutationGraphqlResolver,
  ContractRequestQueryGraphqlResolver,
  ContractRequestGraphqlResolver,
];

const commands = [
  SendRequestService,
  AcceptRequestService,
  RejectRequestService,
  SendRequestEmailService,
  SendBookingRequestStatusEmailService,
];

const queries = [FindContractRequestService, FindContractRequestForLandlordService];

@Module({
  imports: [
    CqrsModule,
    UnitOfWorkModule,
    RentalContextDomainRepositoriesModule,
    GraphqlSubscriptionsModule,
    ContractBullsModule,
  ],
  providers: [...graphqlResolvers, ...commands, ...queries],
})
export class ContractRequestModule {}
