import { UserEntity } from '@domains/user/domain/entities/user.entity';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IAM = createParamDecorator((data: keyof UserEntity, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req || context.switchToHttp().getRequest();
  const user = request.user;

  if (data) {
    return user?.[data];
  }

  return user;
});
