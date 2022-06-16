/**
*   API KUNA - V3 - public
*/
import { Method } from 'axios';
export default class KunaPublic {
    protected api: string;
    /**
     * Get unixtime
    * @description https://kuna.io/api/v3/timestamp
     */
    getUnixTime(): Promise<number>;
    /**
     * List of available currencies
     * @description https://api.kuna.io/v3/currencies
     */
    getCurrencies(): Promise<any>;
    /**
     * Markets
     * @description https://api.kuna.io/v3/markets
     */
    getMarkets(): Promise<any>;
    /**
     * Ticker for market
     * @param market
     * @description https://api.kuna.io/v3/tickers?symbols=btcuah
     */
    getTicker(market: string): Promise<any>;
    /**
     * Order book
     * @param market
     * @description https://api.kuna.io/v3/book/{symbol}
     */
    getOrderBook(market: string): Promise<any>;
    /**
     * Fees for deposit and withdraws
     * @description https://api.kuna.io/v3/fees
     */
    getFees(): Promise<any>;
    request(url_api: string, method?: Method, payload?: object): Promise<any>;
}