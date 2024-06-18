import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface CaughtData<T> {
  data: T[];
}

@Injectable()
export class AdminPanelHeaderInterceptor<T> implements NestInterceptor<T, CaughtData<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<CaughtData<T>> {
    return next.handle().pipe(
      tap((data) => {
        const res = context.switchToHttp().getResponse<Response>();

        if (Array.isArray(data)) {
          res.header('Access-Control-Expose-Headers', 'X-Total-Count');
          res.header('X-Total-Count', `${data.length}`);
        } else {
          res.header('Access-Control-Expose-Headers', 'X-Total-Count');
          res.header('X-Total-Count', `0`);
        }
      }),
    );
  }
}
