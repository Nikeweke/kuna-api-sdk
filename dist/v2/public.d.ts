/**
*   API KUNA - V2 - public
*
*/
import { Method } from 'axios';
export default class KunaPublic {
    protected api: string;
    /**
     * Get unixtime
     * @description https://kuna.io/api/v2/timestamp
     */
    getUnixTime(): Promise<string>;
    /**
     * Ticker (last info about market)
     * @param market
     * @description https://kuna.io/api/v2/tickers/btcuah
     */
    getTicker(market: string): Promise<Object>;
    /**
     * Order book
     * @param market
     * @description https://kuna.io/api/v2/order_book?market=btcuah
     */
    getOrderBook(market: string): Promise<Object>;
    /**
     * History trades
     * @param market
     * @description https://kuna.io/api/v2/trades?market=btcuah
     */
    getHistoryTrades(market: string): Promise<Array<Object>>;
    /**
     * Make an request
     * @param url_api
     * @param method
     * @param payload
     */
    request(url_api: string, method?: Method, payload?: object): Promise<any>;
}
