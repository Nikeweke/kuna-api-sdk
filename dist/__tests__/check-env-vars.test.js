"use strict";
const keys = [
    'KUNA_PUBLIC_KEY',
    'KUNA_SECRET_KEY',
];
// unit tests for env file
describe('env', () => {
    for (const key of keys) {
        it(`should have a ${key}`, () => {
            expect(process.env[key]).toBeDefined();
        });
    }
});
