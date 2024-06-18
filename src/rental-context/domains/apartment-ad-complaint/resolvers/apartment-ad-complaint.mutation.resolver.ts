import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Ok } from 'oxide.ts';

import { CreateApartmentAdComplaintCommand } from '../commands/create-apartment-ad-complaint/create-apartment-ad-complaint.command';
import { CreateApartmentAdComplaintRequest } from '../commands/create-apartment-ad-complaint/create-apartment-ad-complaint.request.dto';
import { ApartmentAdComplaintResponse } from '../dtos/apartment-ad-complaint.response.dto';

@Resolver('ApartmentAdComplaint')
export class ApartmentAdComplaintGraphqlResolver {
  constructor(private commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard())
  @Mutation(() => ApartmentAdComplaintResponse, { name: 'rent_ad_complaint__send' })
  async sendApartmentAdComplaint(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: CreateApartmentAdComplaintRequest,
  ): Promise<ApartmentAdComplaintResponse> {
    const result = await this.commandBus.execute<CreateApartmentAdComplaintCommand, Ok<UUID>>(
      new CreateApartmentAdComplaintCommand(userId, input),
    );

    return ApartmentAdComplaintResponse.create(result.isOk());
  }
}
