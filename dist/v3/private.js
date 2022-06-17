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
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const public_1 = __importDefault(require("./public"));
class KunaPrivate extends public_1.default {
    constructor({ publicKey = '', secretKey = '' }) {
        super();
        this.publicKey = '';
        this.secretKey = '';
        this.publicKey = publicKey;
        this.secretKey = secretKey;
    }
    /**
     *  Get account info
     */
    getAccountInfo() {
        const url = 'auth/me';
        const method = 'post';
        return this.authedRequest(url, method);
    }
    /**
     * Account balance
     */
    accountBalance() {
        const url = 'auth/r/wallets';
        const method = 'post';
        return this.authedRequest(url, method);
    }
    /**
     * Create an order
     * @param {Order} order
     * @description https://docs.kuna.io/docs/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80-1
     */
    createOrder(order) {
        const url = 'auth/w/order/submit';
        const method = 'post';
        return this.authedRequest(url, method, order);
    }
    /**
     * List of active of orders
     * @param {String} market
     * @description https://docs.kuna.io/docs/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80-1
     */
    getOrders(market) {
        const url = `auth/r/orders/${market}`;
        const method = 'post';
        return this.authedRequest(url, method);
    }
    /**
     * Cancel an order or orders
     * @param order_ids
     * @description https://docs.kuna.io/docs/%D0%BE%D1%82%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80
     */
    cancelOrder(order_ids) {
        // const url = `order/cancel` 
        // const body = { order_id }
        const url = `order/cancel/multi`;
        const method = 'post';
        const body = { order_ids: Array.isArray(order_ids) ? order_ids : [order_ids] };
        return this.authedRequest(url, method, body);
    }
    // ===================================================================> EXPERIMENTAL
    /**
     * Cancel buy orders
     * @param market
     * @returns
     */
    cancelBuyOrders(market) {
        return this.cancelOrderBySide(market, 1);
    }
    /**
     * Cancel sell orders
     * @param market string
     * @returns Promise-any
     */
    cancelSellOrders(market) {
        return this.cancelOrderBySide(market, -1);
    }
    /**
     * Cancel all orders
     * @param market
     * @returns
     */
    cancelAllOrders(market) {
        return this.cancelOrderBySide(market, 1)
            .then(() => this.cancelOrderBySide(market, -1));
    }
    /**
     * Cancel orders by given side (sell, buy)
     * @param market
     * @param sign
     * @returns
     */
    cancelOrderBySide(market, sign) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.getOrders(market);
            if (!orders.length)
                return;
            const ordersToCancel = orders.filter((item) => Math.sign(item[7]) === sign);
            if (!ordersToCancel.length)
                return;
            const ordersIds = ordersToCancel.map((item) => item[0]);
            yield this.cancelOrder(ordersIds);
        });
    }
    // ===================================================================> EXPERIMENTAL
    /**
     * Get history of assets (withdraws/deposits)
     * @param {String} type (withdraws, deposits)
     * @description https://docs.kuna.io/docs/get-deposits-and-withdrawals-history
     */
    getAssetsHistory(type = '') {
        if (type)
            type = '/' + type;
        const url = `auth/assets-history` + type;
        const method = 'post';
        return this.authedRequest(url, method);
    }
    /**
     * Get executed orders
     * @param {String} market
     * @description https://docs.kuna.io/docs/%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%80%D0%B4%D0%B5%D1%80%D0%BE%D0%B2
     */
    getExecutedOrders(market) {
        const url = `auth/r/orders/${market}/hist`;
        const method = 'post';
        return this.authedRequest(url, method);
    }
    /**
     * List of trades by order
     * @param {String} market
     * @param {String} order_id
     * @description https://docs.kuna.io/docs/%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%80%D0%B4%D0%B5%D1%80%D0%BE%D0%B2
     */
    getTradesByOrderId(market, order_id) {
        const url = `auth/r/order/${market}:${order_id}/trades`;
        const method = 'post';
        return this.authedRequest(url, method);
    }
    /**
     * Create signature
     * @param {String} url_api
     * @param {Number} nonce
     * @param {Object} body
     */
    getSignature(url_api, nonce, body) {
        const apiPath = `/v3/${url_api}`;
        const signatureString = `${apiPath}${nonce}${JSON.stringify(body)}`;
        return crypto_1.default
            .createHmac('sha384', this.secretKey)
            .update(signatureString)
            .digest('hex');
    }
    /**
     * Make an authed call
     * @param {String} action route path
     * @param {String} method http-method (post, put, delete, ...)
     * @param {Object} payload
     */
    authedRequest(url_api, method = 'GET', payload = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.api + url_api;
            const nonce = yield this.getUnixTime();
            const signature = this.getSignature(url_api, nonce, payload);
            const headers = ({
                'kun-nonce': nonce,
                'kun-apikey': this.publicKey,
                'kun-signature': signature,
                'accept': 'application/json',
            });
            return axios_1.default
                .request({
                url,
                method,
                data: payload,
                headers,
            })
                .then((res) => res.data);
        });
    }
}
exports.default = KunaPrivate;
// interface ActiveOrder {
//   [
//     [
//       100279610,      # ID ордера
//       null,           # не используется
//       null,           # не используется
//       'xrpuah',       # код рынка (валютной пары)
//       1560089091000,  # время создания (timestamp в милисекундах)
//       1560089091000,  # время обновления (timestamp в милисекундах)
//       '45.0',         # объем ордера
//       '-45.0',        # изначальный обьем ордера
//                       # если значение < 0 то ордер на продажу
//                       # если > 0, то ордер на покупку
//       'LIMIT',        # тип ордера (LIMIT or MARKET)
//       null,           # не используется
//       null,           # не используется
//       null,           # не используется
//       null,           # не используется
//       'ACTIVE',       # статус ордера
//       null,           # не используется
//       null,           # не используется
//       '14.0',         # цена ордера
//       '0.0'           # средняя сделок по ордеру
//     ]
//   ]
// }
