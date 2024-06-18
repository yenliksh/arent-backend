import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { Language } from '@libs/ddd/interface-adapters/interfaces/localized.base.interface';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LocalizedProblemInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context).getContext();

      const lang: Language = gqlCtx?.req?.raw?.i18nLang || Language.EN;

      return next.handle().pipe(
        map(async (v) => {
          if (v && typeof v === 'object' && 'problem' in v) {
            const { problem } = v;

            if (problem instanceof LocalizedProblem) {
              await problem.useLang(lang, this.i18n);
            }
          }
          return v;
        }),
      );
    }
    return next.handle();
  }
}
