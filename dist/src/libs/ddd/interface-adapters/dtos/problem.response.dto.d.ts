import { ProblemBase } from '../base-classes/problem.base';
export declare namespace ProblemResponse {
    type IProblem = {
        problem?: ProblemBase;
    };
}
export declare abstract class ProblemResponse {
    static ProblemBase: typeof ProblemBase;
    abstract problem?: ProblemBase;
    static catchProblems<T extends ProblemResponse.IProblem>(ResponseClass: new (...args: any[]) => T, handler: () => Promise<T> | T): Promise<T>;
    static mapToProblems(err: any): ProblemBase;
}
