"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const file_key_helper_1 = require("../../../../../libs/utils/file-key.helper");
class MediaVO extends value_object_base_1.ValueObject {
    static create(props) {
        const photos = props.photos
            .filter(file_key_helper_1.parseFileKeyFromUrl)
            .map((fk, i) => ({ order: i, fileKey: (0, file_key_helper_1.parseFileKeyFromUrl)(fk) }));
        const videos = (props.video || [])
            .filter(file_key_helper_1.parseFileKeyFromUrl)
            .map((fk, i) => ({ order: i, fileKey: fk }));
        return new MediaVO({
            photos,
            videos,
        });
    }
    validate(props) {
        const { photos, videos } = props;
        if (guard_1.Guard.isEmpty(photos)) {
            throw new exceptions_1.ArgumentNotProvidedException('Photos not provided');
        }
        if (!Array.isArray(photos)) {
            throw new exceptions_1.ArgumentInvalidException('Photos must be an array');
        }
        if (!Array.isArray(videos)) {
            throw new exceptions_1.ArgumentInvalidException('Videos must be an array');
        }
    }
}
exports.MediaVO = MediaVO;
//# sourceMappingURL=media.value-object.js.map