import { join } from 'path';

import { AuthNService } from '@modules/auth/services/authn.service';
import { AuthZService } from '@modules/auth/services/authz.service';
import { StrategyPayload } from '@modules/auth/types';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory, GraphQLWsSubscriptionsConfig, SubscriptionConfig } from '@nestjs/graphql';
import { GraphQLFormattedError } from 'graphql';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  private isProduction: boolean;

  constructor(
    readonly configService: ConfigService,
    private readonly authNService: AuthNService,
    private readonly authZService: AuthZService,
  ) {
    this.isProduction = configService.get<string>('nodeEnv') === 'production';
  }

  createGqlOptions(): ApolloDriverConfig {
    return {
      sortSchema: true,
      introspection: true,
      playground: !this.isProduction,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: this._createContext.bind(this),
      formatError: this._formatError.bind(this),
      cors: false,
      installSubscriptionHandlers: true,
      subscriptions: this._configSubscriptions(),
    };
  }

  private _createContext({ req, connection }: any) {
    return {
      req: connection ? connection.context : req,
    };
  }

  private _formatError(error: any) {
    if (error.message === 'VALIDATION_ERROR') {
      const extensions = {
        code: error.extensions.code,
        errors: [] as any,
      };

      Object.keys(error?.extensions?.invalidArgs).forEach((key) => {
        const constraints: any = [];

        // error for nested custom decorators TODO: need to refactor
        if (Array.isArray(error?.extensions?.invalidArgs?.[key]?.children)) {
          Object.keys(error?.extensions?.invalidArgs?.[key]?.children || []).forEach((_key2) => {
            (error?.extensions?.invalidArgs?.[key]?.children[_key2].children || []).map((i: any) => {
              const errorMessage = Object.values(i.constraints || {});

              constraints.push(...errorMessage);
            });

            const errorMessage = Object.values(
              error?.extensions?.invalidArgs?.[key]?.children[_key2].constraints || {},
            );

            constraints.push(...errorMessage);
          });
        }

        Object.keys(error?.extensions?.invalidArgs?.[key]?.constraints || []).forEach((_key) => {
          constraints.push(error?.extensions?.invalidArgs?.[key].constraints[_key]);
        });

        extensions.errors.push({
          field: error?.extensions?.invalidArgs?.[key].property,
          errors: constraints,
        });
      });

      const graphQLFormattedError: GraphQLFormattedError = {
        message: 'VALIDATION_ERROR',
        extensions: extensions,
      };

      return graphQLFormattedError;
    } else {
      return error;
    }
  }

  private _configSubscriptions(): SubscriptionConfig {
    return {
      'subscriptions-transport-ws': {
        connectionInitWaitTimeout: 5000,
        onConnect: async (connectionParams) => {
          const token = (connectionParams as any)?.Authorization?.split(' ')[1];

          if (token) {
            const jwtPayload = await this.authNService.verifyTokenAsync<StrategyPayload>(token);
            const user = await this.authZService.validateUser(jwtPayload);

            if (!user) {
              throw new UnauthorizedException('User not found');
            }

            return {
              user,
              headers: {
                authorization: `Bearer ${token}`,
              },
            };
          }

          throw new UnauthorizedException('Token not found');
        },
      } as GraphQLWsSubscriptionsConfig,
    };
  }
}
