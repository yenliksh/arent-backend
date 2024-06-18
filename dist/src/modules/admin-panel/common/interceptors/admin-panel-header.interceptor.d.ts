import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface CaughtData<T> {
    data: T[];
}
export declare class AdminPanelHeaderInterceptor<T> implements NestInterceptor<T, CaughtData<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<CaughtData<T>>;
}
