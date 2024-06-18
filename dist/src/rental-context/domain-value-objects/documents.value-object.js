"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsVO = void 0;
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
const file_key_helper_1 = require("../../libs/utils/file-key.helper");
class DocumentsVO extends value_object_base_1.ValueObject {
    constructor(props) {
        const transformedProps = DocumentsVO.transform(props);
        super(transformedProps);
        this.props.fileKeys = DocumentsVO.format(transformedProps.fileKeys);
    }
    get fileKeys() {
        return this.props.fileKeys;
    }
    validate({ fileKeys }) {
        if (fileKeys.some(guard_1.Guard.isEmpty)) {
            throw new exceptions_1.ArgumentInvalidException('File key is empty');
        }
        if (!fileKeys.every((i) => guard_1.Guard.isFileKey(i) === true)) {
            throw new exceptions_1.ArgumentInvalidException('Url has incorrect format');
        }
    }
    static format(fileKeys) {
        return fileKeys.map((i) => i.trim());
    }
    static transform(props) {
        return { ...props, fileKeys: props.fileKeys.map(file_key_helper_1.parseFileKeyFromUrl) };
    }
}
exports.DocumentsVO = DocumentsVO;
//# sourceMappingURL=documents.value-object.js.map