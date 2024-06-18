import { Resolver } from '@nestjs/graphql';

import { UserMeResponse } from '../dtos/user.response.dto';

@Resolver(() => UserMeResponse)
export class UserGraphqlResolver {}
