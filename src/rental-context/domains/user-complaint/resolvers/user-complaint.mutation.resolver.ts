import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Ok } from 'oxide.ts';

import { CreateUserComplaintCommand } from '../commands/create-user-complaint/create-user-complaint.command';
import { CreateUserComplaintRequest } from '../commands/create-user-complaint/create-user-complaint.request.dto';
import { UserComplaintResponse } from '../dtos/user-complaint.response.dto';

@Resolver('UserComplaint')
export class UserComplaintGraphqlResolver {
  constructor(private commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard())
  @Mutation(() => UserComplaintResponse, { name: 'user_complaint__send' })
  async sendApartmentAdComplaint(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: CreateUserComplaintRequest,
  ): Promise<UserComplaintResponse> {
    const result = await this.commandBus.execute<CreateUserComplaintCommand, Ok<UUID>>(
      new CreateUserComplaintCommand(userId, input),
    );

    return UserComplaintResponse.create(result.isOk());
  }
}
