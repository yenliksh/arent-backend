"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaMessageVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const file_key_helper_1 = require("../../../../../libs/utils/file-key.helper");
class MediaMessageVO extends value_object_base_1.ValueObject {
    constructor(props) {
        const transformedProps = MediaMessageVO.transform(props);
        super(transformedProps);
        this.props.fileKey = MediaMessageVO.format(transformedProps.fileKey);
    }
    static create(props) {
        return new MediaMessageVO(props);
    }
    get fileKey() {
        return this.props.fileKey;
    }
    get fileName() {
        return this.props.fileName;
    }
    get fileWeight() {
        return this.props.fileWeight;
    }
    validate({ fileKey, fileName, fileWeight }) {
        if (!guard_1.Guard.isFileKey(fileKey)) {
            throw new exceptions_1.ArgumentInvalidException('Message media file key must be in fileKey format');
        }
        if (!guard_1.Guard.isPositiveNumber(fileWeight)) {
            throw new exceptions_1.ArgumentInvalidException('File weight must be positive number');
        }
        if (guard_1.Guard.isEmpty(fileName)) {
            throw new exceptions_1.ArgumentInvalidException('File name must be not empty');
        }
    }
    static format(fileKey) {
        return fileKey.trim();
    }
    static transform(props) {
        return { ...props, fileKey: (0, file_key_helper_1.parseFileKeyFromUrl)(props.fileKey) };
    }
}
exports.MediaMessageVO = MediaMessageVO;
//# sourceMappingURL=media-message.value-object.js.map