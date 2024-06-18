import { ExecutionContext } from '@nestjs/common';
declare const JwtSignUpAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtSignUpAuthGuard extends JwtSignUpAuthGuard_base {
    getRequest(context: ExecutionContext): any;
    canActivate(context: ExecutionContext): Promise<boolean>;
    handleRequest(err: Error, user: any): any;
}
export {};
