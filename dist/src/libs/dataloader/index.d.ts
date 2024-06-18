import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import DataLoader from 'dataloader';
export interface NestDataLoader<ID, Type> {
    generateDataLoader(): DataLoader<ID, Type>;
}
export declare class DataLoaderInterceptor implements NestInterceptor {
    private readonly moduleRef;
    constructor(moduleRef: ModuleRef);
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
export declare const Loader: (...dataOrPipes: any[]) => ParameterDecorator;
