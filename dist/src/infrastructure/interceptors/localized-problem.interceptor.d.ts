import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
export declare class LocalizedProblemInterceptor implements NestInterceptor {
    private readonly i18n;
    constructor(i18n: I18nService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
