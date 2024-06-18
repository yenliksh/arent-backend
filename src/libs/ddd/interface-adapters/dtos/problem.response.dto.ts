import { ProblemBase } from '../base-classes/problem.base';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProblemResponse {
  export type IProblem = {
    problem?: ProblemBase;
  };
}

export abstract class ProblemResponse {
  public static ProblemBase = ProblemBase;

  abstract problem?: ProblemBase;

  /**
   * @example
   * // usual case
   * await ProblemResponse.catchProblems(MyResponse, () => {
   *   return MyResponse.create({...data});
   * }); // MyResponse { record: {...data} }
   * // error case
   * await ProblemResponse.catchProblems(MyResponse, () => {
   *   throw new MyResponse.SomeProblem();
   * }); // MyResponse { errors: [MyResponse.SomeProblem] }
   */
  public static async catchProblems<T extends ProblemResponse.IProblem>(
    ResponseClass: new (...args: any[]) => T,
    handler: () => Promise<T> | T,
  ) {
    try {
      const response = await handler();
      return response as T;
    } catch (err) {
      const response = new ResponseClass();
      response.problem = ProblemResponse.mapToProblems(err);
      return response as T;
    }
  }

  static mapToProblems(err: any): ProblemBase {
    if (err instanceof ProblemResponse.ProblemBase) {
      return err;
    }

    throw err;
  }
}
