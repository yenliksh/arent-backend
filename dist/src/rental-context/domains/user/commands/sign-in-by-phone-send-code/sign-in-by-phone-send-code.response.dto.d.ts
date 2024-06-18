import { BaseOkProps, OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { SendSmsCodeRestrictionProblem } from 'src/rental-context/domains/user/problems/send-sms-code-rescriction.problem';
declare type SendCodeResponseProps = BaseOkProps & {
    smscode?: string | null;
};
export declare class SignInByPhoneSendCodeResponse extends OkResponse implements ProblemResponse {
    constructor(props: SendCodeResponseProps);
    smscode: string | null;
    problem?: SendSmsCodeRestrictionProblem;
    static create(props: SendCodeResponseProps): SignInByPhoneSendCodeResponse;
}
export {};
