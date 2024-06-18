"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataWithBeforeCursor = exports.getDataWithAfterCursor = exports.decodeCursor = exports.encodeCursor = void 0;
function encodeCursor(payload) {
    return Buffer.from(JSON.stringify(payload)).toString('base64');
}
exports.encodeCursor = encodeCursor;
function decodeCursor(cursor) {
    return JSON.parse(Buffer.from(cursor, 'base64').toString());
}
exports.decodeCursor = decodeCursor;
function getDataWithAfterCursor(data, limit, mapper, filter, cursorFields) {
    const toReturn = (data, nextAfterCursor) => ({
        data: data.map(mapper),
        pageInfo: {
            perPage: limit,
            count: data.length,
            afterCursor: nextAfterCursor,
        },
    });
    let nextAfterCursor = null;
    const hasMore = data.length > limit;
    if (hasMore) {
        data.splice(data.length - 1, 1);
    }
    if (data.length === 0) {
        return toReturn(data, nextAfterCursor);
    }
    else {
        if (hasMore) {
            if (cursorFields) {
                const cursorPayload = {};
                for (const field of cursorFields) {
                    cursorPayload[field] = data[data.length - 1][field];
                }
                nextAfterCursor = encodeCursor({ ...cursorPayload, filter });
            }
            else {
                nextAfterCursor = encodeCursor({ ...data[data.length - 1], filter });
            }
        }
    }
    return toReturn(data, nextAfterCursor);
}
exports.getDataWithAfterCursor = getDataWithAfterCursor;
function getDataWithBeforeCursor(data, limit, mapper, filter, cursorFields) {
    const toReturn = (data, nextAfterCursor) => ({
        data: data.map(mapper),
        pageInfo: {
            perPage: limit,
            count: data.length,
            beforeCursor: nextAfterCursor,
        },
    });
    let nextAfterCursor = null;
    const hasMore = data.length > limit;
    if (hasMore) {
        data.splice(data.length - 1, 1);
    }
    if (data.length === 0) {
        return toReturn(data, nextAfterCursor);
    }
    else {
        if (hasMore) {
            if (cursorFields) {
                const cursorPayload = {};
                for (const field of cursorFields) {
                    cursorPayload[field] = data[data.length - 1][field];
                }
                nextAfterCursor = encodeCursor({ ...cursorPayload, filter });
            }
            else {
                nextAfterCursor = encodeCursor({ ...data[data.length - 1], filter });
            }
        }
    }
    return toReturn(data, nextAfterCursor);
}
exports.getDataWithBeforeCursor = getDataWithBeforeCursor;
//# sourceMappingURL=cursor-paginator.js.map