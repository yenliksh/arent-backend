import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AdminViewedApartmentAdComplaintHandler } from './commands/admins/admin-set-viewed-apartment-ad-complaint/admin-set-viewed-apartment-ad-complaint.handler';
import { CreateApartmentAdComplaintHandler } from './commands/create-apartment-ad-complaint/create-apartment-ad-complaint.handler';
import { ApartmentAdComplaintGraphqlResolver } from './resolvers/apartment-ad-complaint.mutation.resolver';

const commands = [CreateApartmentAdComplaintHandler, AdminViewedApartmentAdComplaintHandler];

const graphqlResolvers = [ApartmentAdComplaintGraphqlResolver];

@Module({
  imports: [CqrsModule, RentalContextDomainRepositoriesModule],
  providers: [...commands, ...graphqlResolvers],
})
export class ApartmentAdComplaintModule {}
