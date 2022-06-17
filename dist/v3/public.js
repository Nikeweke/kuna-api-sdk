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
        return this.request('timestamp').then((data) => data.timestamp_miliseconds);
    }
    /**
     * List of available currencies
     * @description https://api.kuna.io/v3/currencies
     */
    getCurrencies() {
        return this.request(`currencies`);
    }
    /**
     * Markets
     * @description https://api.kuna.io/v3/markets
     */
    getMarkets() {
        return this.request(`markets`);
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
        return this.request(`tickers?symbols=${market}`);
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
        return this.request('book/' + market);
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
        return this.request('fees');
    }
    request(url_api, method = 'GET', payload = {}) {
        const url = this.api + url_api;
        return axios_1.default
            .request({ url, method, data: payload })
            .then((res) => res.data);
    }
}
exports.default = KunaPublic;
