/**
*   API KUNA - V2 - private
*
*/
import { Method } from 'axios';
import KunaPublic from "./public";
import { IKeys, KunaApiPrivate } from '../interfaces';
declare type OrderSide = 'buy' | 'sell';
interface Order {
    market: string;
    price: number;
    side: OrderSide;
    volume: number;
}
interface Asset {
    currency: string;
    balance: string;
    locked: string;
}
interface AccountInfo {
    email: string;
    activated: boolean;
    accounts: Array<Asset>;
}
export { Asset, AccountInfo, OrderSide, Order };
export default class KunaPrivate extends KunaPublic implements KunaApiPrivate {
    private accessKey;
    private secretKey;
    constructor({ publicKey, secretKey }: IKeys);
    /**
     * Get active orders
     * @param market its a pair of crypto (btcuah, ethuah)
     * @description https://kuna.io/api/v2/orders
     */
    getOrders(market: string): Promise<any>;
    /**
     * Info about user and assets
     * @description https://kuna.io/api/v2/members/me
     */
    getAccountInfo(): Promise<AccountInfo>;
    /**
     * Отмена ордера
     * @param order_id
     * @description {POST} https://kuna.io/api/v2/order/delete
     */
    cancelOrder(order_id: number): Promise<any>;
    /**
     * Create an order
     * @param order [market, price, side, volume]
     * @param  side — buy или sell
     * @param  volume — объём ордера в биткоинах
     * @param  market — btcuah
     * @param  price — цена за один биткоин
     * @description {POST} https://kuna.io/api/v2/orders
     */
    makeOrder(order: Order): Promise<any>;
    /**
     * Trades history
     * @param market pair of crypto(btcuah)
     * @description https://kuna.io/api/v2/trades/my
     */
    getTrades(market: string): Promise<any>;
    /**
     * Get signature
     * @param url_api
     * @param nonce
     * @param body
     */
    getSignature(method: Method, url: string, queryParams: string): string;
    /**
     * Make an authed request
     * @param {String} url_api
     * @param {String} method
     * @param {Object} params
     * @param {Object} body
     */
    authedRequest(url_api: string, method: Method, params: Object, payload?: Object): Promise<any>;
}
