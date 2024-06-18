import { RefreshTokenResult } from './refresh-token.service';
export declare class RefreshTokenResponse {
    refreshToken?: string;
    token?: string;
    static create(props: RefreshTokenResult): RefreshTokenResponse;
}
