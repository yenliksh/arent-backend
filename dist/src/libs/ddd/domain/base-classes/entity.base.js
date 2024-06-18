"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const exceptions_1 = require("../../../exceptions");
const guard_1 = require("../guard");
const utils_1 = require("../utils");
const date_value_object_1 = require("../value-objects/date.value-object");
class Entity {
    constructor({ id, createdAt, props }) {
        this.setId(id);
        this.validateProps(props);
        const now = date_value_object_1.DateVO.now();
        this._createdAt = createdAt || now;
        this._updatedAt = now;
        this._deletedAt = null;
        this.props = props;
        this.validate();
    }
    get id() {
        return this._id;
    }
    setId(id) {
        this._id = id;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    get deletedAt() {
        return this._deletedAt;
    }
    static isEntity(entity) {
        return entity instanceof Entity;
    }
    equals(object) {
        if (object === null || object === undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!Entity.isEntity(object)) {
            return false;
        }
        return this.id ? this.id.equals(object.id) : false;
    }
    getPropsCopy() {
        const propsCopy = {
            id: this._id,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            deletedAt: this._deletedAt,
            ...this.props,
        };
        return Object.freeze(propsCopy);
    }
    toObject() {
        var _a;
        const plainProps = (0, utils_1.convertPropsToObject)(this.props);
        const result = {
            id: this._id.value,
            createdAt: this._createdAt.value,
            updatedAt: this._updatedAt.value,
            deletedAt: ((_a = this._deletedAt) === null || _a === void 0 ? void 0 : _a.value) || null,
            ...plainProps,
        };
        return Object.freeze(result);
    }
    validateProps(props) {
        const maxProps = 50;
        if (guard_1.Guard.isEmpty(props)) {
            throw new exceptions_1.ArgumentNotProvidedException('Entity props should not be empty');
        }
        if (typeof props !== 'object') {
            throw new exceptions_1.ArgumentInvalidException('Entity props should be an object');
        }
        if (Object.keys(props).length > maxProps) {
            throw new exceptions_1.ArgumentOutOfRangeException(`Entity props should not have more than ${maxProps} properties`);
        }
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.base.js.map