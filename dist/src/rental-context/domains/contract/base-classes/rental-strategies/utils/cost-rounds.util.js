"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.costFloor = exports.costCeil = void 0;
const costCeil = (cost) => Math.ceil(cost / 100) * 100;
exports.costCeil = costCeil;
const costFloor = (cost) => Math.floor(cost / 100) * 100;
exports.costFloor = costFloor;
//# sourceMappingURL=cost-rounds.util.js.map