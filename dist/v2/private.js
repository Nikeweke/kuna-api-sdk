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
/**
*   API KUNA - V2 - private
*
*/
const axios_1 = __importDefault(require("axios"));
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
        const url = '/orders';
        const method = 'GET';
        const params = { market };
        return this.authedRequest(url, method, params);
    }
    /**
     * Info about user and assets
     * @description https://kuna.io/api/v2/members/me
     */
    getAccountInfo() {
        const url = '/members/me';
        const method = 'GET';
        const params = {};
        return this.authedRequest(url, method, params);
    }
    /**
     * Отмена ордера
     * @param order_id
     * @description {POST} https://kuna.io/api/v2/order/delete
     */
    cancelOrder(order_id) {
        const url = '/order/delete';
        const method = 'POST';
        const params = { id: order_id };
        return this.authedRequest(url, method, params);
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
        const url = '/orders';
        const method = 'POST';
        const params = Object.assign({}, order);
        const body = order;
        return this.authedRequest(url, method, params, body);
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
        const url = '/trades/my';
        const method = 'GET';
        const params = { market };
        return this.authedRequest(url, method, params);
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
    /**
     * Make an authed request
     * @param {String} url_api
     * @param {String} method
     * @param {Object} params
     * @param {Object} body
     */
    authedRequest(url_api, method, params, payload = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // nonce 
            const tonce = yield this.getUnixTime();
            let queryParams = (0, utils_1.toQueryParams)(Object.assign({ access_key: this.accessKey, tonce }, params));
            // signature
            const signature = this.getSignature(method, url_api, queryParams);
            queryParams += `&signature=${signature}`;
            // preparing axios request
            const url = `${this.api}${url_api}?${queryParams}`;
            return axios_1.default
                .request({
                url,
                method,
                data: payload,
            })
                .then((res) => res.data);
        });
    }
}
exports.default = KunaPrivate;
