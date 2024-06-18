import { ArgumentsHost, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
export declare class ExceptionFilter implements GqlExceptionFilter {
    readonly configService: ConfigService;
    private isDebug;
    constructor(configService: ConfigService);
    catch(exception: HttpException, host: ArgumentsHost): void | ApolloError;
    handleGraphqlContext(exception: HttpException, exceptionResponse: string | object): ApolloError;
    handleHttpContext(exception: HttpException, host: ArgumentsHost): void;
}
