import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AdminViewedUserComplaintHandler } from './commands/admins/admin-set-viewed-user-complaint.handler';
import { CreateUserComplaintHandler } from './commands/create-user-complaint/create-user-complaint.handler';
import { UserComplaintGraphqlResolver } from './resolvers/user-complaint.mutation.resolver';

const commands = [CreateUserComplaintHandler, AdminViewedUserComplaintHandler];

const graphqlResolvers = [UserComplaintGraphqlResolver];

@Module({
  imports: [CqrsModule, RentalContextDomainRepositoriesModule],
  providers: [...commands, ...graphqlResolvers],
})
export class UserComplaintModule {}
