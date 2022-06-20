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
        return this.request({
            url: '/timestamp',
            method: 'GET',
            params: {},
        })
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
        return this.request({
            url: '/tickers/' + market,
            method: 'GET',
            params: {},
        })
            .then(({ ticker }) => ticker);
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
        return this.request({
            url: '/order_book?market=' + market,
            method: 'GET',
            params: {},
        });
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
        return this.request({
            url: '/trades?market=' + market,
            method: 'GET',
            params: {},
        });
    }
    /**
     * Make a request
     * @param requestConfig AxiosRequestConfig
     */
    request(requestConfig) {
        requestConfig.url = this.api + requestConfig.url;
        return axios_1.default
            .request(requestConfig)
            .then((r) => r.data);
    }
}
exports.default = KunaPublic;
