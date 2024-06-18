import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadPolymorphData, TokenType } from '../types';
export declare class AuthNService {
    private readonly jwtService;
    private readonly configService;
    private jwtSecret;
    private jwtExpiresIn;
    private jwtRefreshSecret;
    private jwtRefreshExpiresIn;
    private jwtSignUpSecret;
    private jwtSignUpExpiresIn;
    constructor(jwtService: JwtService, configService: ConfigService);
    private getExpirationTime;
    private getJwtOptions;
    createToken<T extends TokenType>(type: T, payload: JwtPayloadPolymorphData<T>): Promise<string>;
    verifyTokenAsync<T extends object>(token: string): Promise<T>;
}
