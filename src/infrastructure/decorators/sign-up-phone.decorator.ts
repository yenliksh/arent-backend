import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const SignUpPhoneDecorator = createParamDecorator((_: any, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req || context.switchToHttp().getRequest();
  const phone = request.user;

  return phone;
});
