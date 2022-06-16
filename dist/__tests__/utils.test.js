"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
describe('utils: toQueryParams', () => {
    test('should be equal to given string', () => {
        const obj = {
            key2: 'val2',
            key1: 'val1',
        };
        const result = 'key2=val2&key1=val1';
        expect((0, utils_1.toQueryParams)(obj)).toBe(result);
    });
});
