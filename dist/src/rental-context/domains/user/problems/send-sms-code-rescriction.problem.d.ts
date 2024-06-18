import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
export declare class SendSmsCodeRestrictionProblem extends LocalizedProblem {
    constructor(secondsLeftToSendAgain: number);
}
