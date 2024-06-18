import { AuthNService } from '@modules/auth/services/authn.service';
import { AuthZService } from '@modules/auth/services/authz.service';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
export declare class GraphQLConfigService implements GqlOptionsFactory {
    readonly configService: ConfigService;
    private readonly authNService;
    private readonly authZService;
    private isProduction;
    constructor(configService: ConfigService, authNService: AuthNService, authZService: AuthZService);
    createGqlOptions(): ApolloDriverConfig;
    private _createContext;
    private _formatError;
    private _configSubscriptions;
}
