"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUID = void 0;
const argument_invalid_exception_1 = require("../../../exceptions/argument-invalid.exception");
const uuid_1 = require("uuid");
const id_value_object_1 = require("./id.value-object");
class UUID extends id_value_object_1.ID {
    static generate() {
        return new UUID((0, uuid_1.v4)());
    }
    validate({ value }) {
        if (!(0, uuid_1.validate)(value)) {
            throw new argument_invalid_exception_1.ArgumentInvalidException('Incorrect UUID format');
        }
    }
}
exports.UUID = UUID;
//# sourceMappingURL=uuid.value-object.js.map