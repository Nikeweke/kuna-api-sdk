/**
*   API KUNA - V2 - private
*
*/
import { AxiosResponse, Method } from 'axios';
import KunaPublic from "./public";
import { IKeys } from '../interfaces';
declare type OrderSide = 'buy' | 'sell';
interface Order {
    market: string;
    price: number;
    side: OrderSide;
    volume: number;
}
export default class KunaPrivate extends KunaPublic {
    private accessKey;
    private secretKey;
    private tonce;
    private query_params;
    private url_params;
    private signature;
    constructor({ publicKey, secretKey }: IKeys);
    /**
     * Get active orders
     * @param market its a pair of crypto (btcuah, ethuah)
     * @description https://kuna.io/api/v2/orders
     */
    getOrders(market: string): Promise<AxiosResponse<any, any>>;
    /**
     * Info about user and assets
     * @description https://kuna.io/api/v2/members/me
     */
    getInfoUser(): Promise<AxiosResponse<any, any>>;
    /**
     * Отмена ордера
     * @param order_id
     * @description {POST} https://kuna.io/api/v2/order/delete
     */
    cancelOrder(order_id: number): Promise<AxiosResponse<any, any>>;
    /**
     * Create an order
     * @param order [market, price, side, volume]
     * @param  side — buy или sell
     * @param  volume — объём ордера в биткоинах
     * @param  market — btcuah
     * @param  price — цена за один биткоин
     * @description {POST} https://kuna.io/api/v2/orders
     */
    makeOrder(order: Order): Promise<AxiosResponse<any, any>>;
    /**
     * Trades history
     * @param market pair of crypto(btcuah)
     * @description https://kuna.io/api/v2/trades/my
     */
    getTrades(market: string): Promise<AxiosResponse<any, any>>;
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
    authedRequest(url_api: string, method: Method, params: Object, payload?: Object): Promise<AxiosResponse>;
}
export {};
