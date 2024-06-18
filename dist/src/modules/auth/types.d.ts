export declare enum TokenType {
    SIGN_UP = "SIGN_UP",
    REFRESH = "REFRESH",
    USER = "USER",
    ADMIN = "ADMIN"
}
export interface JwtPayloadMap {
    [TokenType.SIGN_UP]: {
        phone?: string;
        email?: string;
    };
    [TokenType.USER]: {
        id: string;
        phone?: string;
        email?: string;
    };
    [TokenType.ADMIN]: {
        id: string;
    };
    [TokenType.REFRESH]: {
        id: string;
        phone?: string;
        email?: string;
    };
}
export declare type JwtPayloadPolymorphData<T extends keyof JwtPayloadMap> = JwtPayloadMap[T];
export declare type StrategyPayload = {
    [P in keyof JwtPayloadMap as Exclude<P, TokenType.SIGN_UP>]: JwtPayloadPolymorphData<P> & {
        tokenType: P;
        expiration: Date;
    };
}[Exclude<TokenType, TokenType.SIGN_UP>];
export declare type TokenPayloadMap = {
    [P in keyof JwtPayloadMap as Exclude<P, TokenType.SIGN_UP>]: (props: JwtPayloadPolymorphData<P> & {
        tokenType: P;
        expiration: Date;
    }) => void;
};
