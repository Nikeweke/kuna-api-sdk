"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQueryParams = void 0;
/**
 * Get object and make it to query-params string
 * @param obj
 * @returns string - like key=val&ke2=val2
 */
function toQueryParams(obj) {
    const str = Array();
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" +
                encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
exports.toQueryParams = toQueryParams;
