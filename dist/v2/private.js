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
const crypto_1 = __importDefault(require("crypto"));
const public_1 = __importDefault(require("./public"));
const utils_1 = require("../utils");
class KunaPrivate extends public_1.default {
    constructor({ publicKey = '', secretKey = '' }) {
        super();
        this.accessKey = '';
        this.secretKey = '';
        this.accessKey = publicKey;
        this.secretKey = secretKey;
    }
    /**
     * Get active orders
     * @param market its a pair of crypto (btcuah, ethuah)
     * @description https://kuna.io/api/v2/orders
     */
    getOrders(market) {
        if (!market) {
            return Promise.reject('Pass a pair of crypto (btcuah, ethuah)');
        }
        return this.addAuth({
            url: '/orders',
            method: 'GET',
            params: { market },
        }).then(this.request.bind(this));
    }
    /**
     * Info about user and assets
     * @description https://kuna.io/api/v2/members/me
     */
    getAccountInfo() {
        return this.addAuth({
            url: '/members/me',
            method: 'GET',
            params: {},
        }).then(this.request.bind(this));
    }
    /**
     * Отмена ордера
     * @param order_id
     * @description {POST} https://kuna.io/api/v2/order/delete
     */
    cancelOrder(order_id) {
        return this.addAuth({
            url: '/order/delete',
            method: 'POST',
            params: { id: order_id },
        }).then(this.request.bind(this));
    }
    /**
     * Create an order
     * @param order [market, price, side, volume]
     * @param  side — buy или sell
     * @param  volume — объём ордера в биткоинах
     * @param  market — btcuah
     * @param  price — цена за один биткоин
     * @description {POST} https://kuna.io/api/v2/orders
     */
    makeOrder(order) {
        return this.addAuth({
            url: '/orders',
            method: 'POST',
            params: order,
            data: order,
        }).then(this.request.bind(this));
    }
    /**
     * Trades history
     * @param market pair of crypto(btcuah)
     * @description https://kuna.io/api/v2/trades/my
     */
    getTrades(market) {
        if (!market) {
            return Promise.reject('Pass a pair of crypto (btcuah, ethuah)');
        }
        return this.addAuth({
            url: '/trades/my',
            method: 'GET',
            params: { market },
        }).then(this.request.bind(this));
    }
    /**
     * Get signature
     * @param url_api
     * @param nonce
     * @param body
     */
    getSignature(method, url, queryParams) {
        const signatureString = `${method}|/api/v2${url}|${queryParams}`;
        return crypto_1.default
            .createHmac('sha256', this.secretKey)
            .update(signatureString)
            .digest('hex');
    }
    addAuth(requestConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params, url, method } = requestConfig;
            // nonce 
            const tonce = yield this.getUnixTime();
            let queryParams = (0, utils_1.toQueryParams)(Object.assign({ access_key: this.accessKey, tonce }, params));
            // signature
            const signature = this.getSignature(method, url, queryParams);
            queryParams += `&signature=${signature}`;
            // preparing axios request
            requestConfig.url = `${url}?${queryParams}`;
            return requestConfig;
        });
    }
}
exports.default = KunaPrivate;
