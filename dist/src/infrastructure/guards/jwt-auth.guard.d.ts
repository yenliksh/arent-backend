import { TokenType } from '@modules/auth/types';
import { CanActivate, Type } from '@nestjs/common';
export declare const AllowUnauthorized: () => import("@nestjs/common").CustomDecorator<string>;
export declare function JwtAuthGuard(...tokenTypes: TokenType[]): Type<CanActivate>;
