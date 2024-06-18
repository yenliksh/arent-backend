"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardType = void 0;
const getCardType = (panMasked) => {
    const firstNumber = Number(panMasked[0]);
    if (firstNumber === 4) {
        return 'VISA';
    }
    if (firstNumber === 5) {
        return 'MASTERCARD';
    }
    throw new Error('Invalid pan masked');
};
exports.getCardType = getCardType;
//# sourceMappingURL=get-card-type.util.js.map