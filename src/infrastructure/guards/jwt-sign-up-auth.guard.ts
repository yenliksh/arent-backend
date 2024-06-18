import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class JwtSignUpAuthGuard extends AuthGuard('jwt-sign-up') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req || context.switchToHttp().getRequest();
    return request;
  }

  async canActivate(context: ExecutionContext) {
    let result = super.canActivate(context);

    if (result instanceof Observable) {
      result = lastValueFrom(result);
    } else {
      result = Promise.resolve(result);
    }
    await result;

    return result;
  }

  handleRequest(err: Error, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
