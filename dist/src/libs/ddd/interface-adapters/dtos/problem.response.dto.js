"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemResponse = void 0;
const openapi = require("@nestjs/swagger");
const problem_base_1 = require("../base-classes/problem.base");
class ProblemResponse {
    static async catchProblems(ResponseClass, handler) {
        try {
            const response = await handler();
            return response;
        }
        catch (err) {
            const response = new ResponseClass();
            response.problem = ProblemResponse.mapToProblems(err);
            return response;
        }
    }
    static mapToProblems(err) {
        if (err instanceof ProblemResponse.ProblemBase) {
            return err;
        }
        throw err;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { problem: { required: false, type: () => require("../base-classes/problem.base").ProblemBase } };
    }
}
exports.ProblemResponse = ProblemResponse;
ProblemResponse.ProblemBase = problem_base_1.ProblemBase;
//# sourceMappingURL=problem.response.dto.js.map