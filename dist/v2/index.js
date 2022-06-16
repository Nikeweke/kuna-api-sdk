"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const private_1 = __importDefault(require("./private"));
const public_1 = __importDefault(require("./public"));
/**
 * Get v2 kuna API instances
 * @param keys - object { publicKey, secretKey }
 */
function default_1(keys) {
    return {
        public: new public_1.default(),
        private: new private_1.default(keys)
    };
}
exports.default = default_1;
