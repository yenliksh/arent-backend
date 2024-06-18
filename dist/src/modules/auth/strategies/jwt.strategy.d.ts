import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AuthZService } from '../services/authz.service';
import { StrategyPayload } from '../types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    readonly configService: ConfigService;
    private readonly authZService;
    constructor(configService: ConfigService, authZService: AuthZService);
    validate(payload: StrategyPayload): Promise<any>;
}
export {};
