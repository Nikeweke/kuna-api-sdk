"use strict";
/**
*   API KUNA - V2 - public
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class KunaPublic {
    constructor() {
        this.api = 'https://kuna.io/api/v2';
    }
    /**
     * Get unixtime
     * @description https://kuna.io/api/v2/timestamp
     */
    getUnixTime() {
        return this
            .request('/timestamp')
            .then((unixTime) => unixTime + '000');
    }
    /**
     * Ticker (last info about market)
     * @param market
     * @description https://kuna.io/api/v2/tickers/btcuah
     */
    getTicker(market) {
        if (!market) {
            return Promise.reject('Set a pair of crypto (btcuah, ethuah)');
        }
        return this.request('/tickers/' + market).then(({ ticker }) => ticker);
    }
    /**
     * Order book
     * @param market
     * @description https://kuna.io/api/v2/order_book?market=btcuah
     */
    getOrderBook(market) {
        if (!market) {
            return Promise.reject('Set a pair of crypto (btcuah, ethuah)');
        }
        return this.request('/order_book?market=' + market);
    }
    /**
     * History trades
     * @param market
     * @description https://kuna.io/api/v2/trades?market=btcuah
     */
    getHistoryTrades(market) {
        if (!market) {
            return Promise.reject('Set a pair of crypto (btcuah, ethuah)');
        }
        return this.request('/trades?market=' + market);
    }
    /**
     * Make an request
     * @param url_api
     * @param method
     * @param payload
     */
    request(url_api, method = 'GET', payload = {}) {
        const url = this.api + url_api;
        return axios_1.default
            .request({ url, method, data: payload })
            .then((res) => res.data);
    }
}
exports.default = KunaPublic;
