import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface SentryInterceptorOptions {
    filters?: {
        fromStatus?: number;
    };
}
export declare class SentryInterceptor implements NestInterceptor {
    private readonly options?;
    constructor(options?: SentryInterceptorOptions | undefined);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private captureHttpException;
    private captureWsException;
    private captureGraphqlException;
    private shouldReport;
}
