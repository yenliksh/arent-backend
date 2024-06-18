import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { AuthNService } from '@modules/auth/services/authn.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { EmailAlreadyUsedProblem } from 'src/rental-context/domains/user/problems/email-already-used.problem';
import { SignUpByPhoneCreateUserRequest } from './sign-up-by-phone-create-create-user.request.dto';
declare type CreateUserResult = {
    userId: UUID;
    token: string;
    refreshToken: string;
};
export declare class SignUpByPhoneCreateUserService {
    private readonly authService;
    private readonly userRepository;
    private eventEmitter;
    constructor(authService: AuthNService, userRepository: UserRepository, eventEmitter: EventEmitter2);
    handle(dto: SignUpByPhoneCreateUserRequest, phone: string): Promise<Result<CreateUserResult, UnprocessableEntityException | EmailAlreadyUsedProblem>>;
}
export {};
