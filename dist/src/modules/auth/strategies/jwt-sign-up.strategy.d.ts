import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtPayloadMap, TokenType } from '../types';
declare const JwtSignUpStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtSignUpStrategy extends JwtSignUpStrategy_base {
    readonly configService: ConfigService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayloadMap[TokenType.SIGN_UP]): Promise<any>;
}
export {};
