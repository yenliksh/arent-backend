"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimezoneUtil = void 0;
const geoTz = require("geo-tz");
const cacheMap = new Map();
geoTz.setCache({ store: cacheMap });
class TimezoneUtil {
    static getOffsetByCords(cords) {
        return geoTz.find(cords.lat, cords.lng)[0];
    }
}
exports.TimezoneUtil = TimezoneUtil;
//# sourceMappingURL=timezone-util.js.map