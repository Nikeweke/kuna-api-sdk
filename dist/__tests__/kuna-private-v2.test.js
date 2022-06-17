"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const private_1 = __importDefault(require("../v2/private"));
const KEYS = {
    publicKey: process.env.KUNA_PUBLIC_KEY || '',
    secretKey: process.env.KUNA_SECRET_KEY || '',
};
describe('Kuna.private v2:', () => {
    test('Get account info', () => __awaiter(void 0, void 0, void 0, function* () {
        const api = new private_1.default(KEYS);
        const data = yield api.getAccountInfo();
        expect(data.email).toBeDefined();
        expect(data.activated).toBe(true);
    }));
});
