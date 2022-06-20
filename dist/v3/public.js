"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
*   API KUNA - V3 - public
*/
const axios_1 = __importDefault(require("axios"));
class KunaPublic {
    constructor() {
        this.api = 'https://api.kuna.io/v3/';
    }
    /**
     * Get unixtime
    * @description https://api.kuna.io/v3/timestamp
     */
    getUnixTime() {
        return this.request({
            url: 'timestamp',
            method: 'GET',
            params: {},
        }).then((data) => data.timestamp_miliseconds);
    }
    /**
     * List of available currencies
     * @description https://api.kuna.io/v3/currencies
     */
    getCurrencies() {
        return this.request({
            url: 'currencies',
            method: 'GET',
            params: {},
        });
    }
    /**
     * Markets
     * @description https://api.kuna.io/v3/markets
     */
    getMarkets() {
        return this.request({
            url: 'markets',
            method: 'GET',
            params: {},
        });
    }
    /**
     * Ticker for market
     * @param market
     * @description https://api.kuna.io/v3/tickers?symbols=btcuah
     */
    getTicker(market) {
        if (!market) {
            return Promise.reject('Set a pair of crypto (btcuah, ethuah)');
        }
        return this.request({
            url: `tickers?symbols=${market}`,
            method: 'GET',
            params: {},
        });
    }
    /**
     * Order book
     * @param market
     * @description https://api.kuna.io/v3/book/{symbol}
     */
    getOrderBook(market) {
        if (!market) {
            return Promise.reject('Set a pair of crypto (btcuah, ethuah)');
        }
        return this.request({
            url: 'book/' + market,
            method: 'GET',
            params: {},
        });
    }
    /**
     * @description Not implemented by KUNA API V3
     * @param market
     */
    getHistoryTrades(market) {
        return Promise.resolve([
            { message: 'in kuna-api-v3 this action not implemented yet' }
        ]);
    }
    /**
     * Fees for deposit and withdraws
     * @description https://api.kuna.io/v3/fees
     */
    getFees() {
        return this.request({
            url: 'fees',
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
