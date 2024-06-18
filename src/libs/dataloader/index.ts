import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  createParamDecorator,
} from '@nestjs/common';
import { APP_INTERCEPTOR, ContextIdFactory, ModuleRef } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import DataLoader from 'dataloader';

/**
 * This interface will be used to generate the initial data loader.
 * The concrete implementation should be added as a provider to your module.
 */
export interface NestDataLoader<ID, Type> {
  /**
   * Should return a new instance of dataloader each time
   */
  generateDataLoader(): DataLoader<ID, Type>;
}

/**
 * Context key where get loader function will be stored.
 * This class should be added to your module providers like so:
 * {
 *     provide: APP_INTERCEPTOR,
 *     useClass: DataLoaderInterceptor,
 * },
 */
const NEST_LOADER_CONTEXT_KEY = 'NEST_LOADER_CONTEXT_KEY';

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(private readonly moduleRef: ModuleRef) {}
  /**
   * @inheritdoc
   */
  intercept(context: ExecutionContext, next: CallHandler) {
    const graphqlExecutionContext = GqlExecutionContext.create(context);
    const ctx = graphqlExecutionContext.getContext();

    if (ctx[NEST_LOADER_CONTEXT_KEY] === undefined) {
      ctx[NEST_LOADER_CONTEXT_KEY] = {
        contextId: ContextIdFactory.create(),
        getLoader: (type: string): Promise<NestDataLoader<any, any>> => {
          if (ctx[type] === undefined) {
            try {
              ctx[type] = this.moduleRef
                .get<NestDataLoader<any, any>>(type, {
                  strict: false,
                })
                .generateDataLoader();

              return ctx[type];
            } catch (e) {
              throw new InternalServerErrorException(`The loader ${type} is not provided` + e);
            }
          }
          return ctx[type];
        },
      };
    }

    return next.handle();
  }
}

/**
 * The decorator to be used within your graphql method.
 */
export const Loader = createParamDecorator(async (data: any, context: ExecutionContext & { [key: string]: any }) => {
  const ctx: any = GqlExecutionContext.create(context).getContext();

  if (ctx[NEST_LOADER_CONTEXT_KEY] === undefined) {
    throw new InternalServerErrorException(`
              You should provide interceptor ${DataLoaderInterceptor.name} globally with ${APP_INTERCEPTOR}
            `);
  }

  return await ctx[NEST_LOADER_CONTEXT_KEY].getLoader(data);
});
