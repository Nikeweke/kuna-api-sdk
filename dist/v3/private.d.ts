import { Method } from "axios";
import KunaPublic from "./public";
import { IKeys, KunaApiPrivate } from '../interfaces';
declare type OrderType = 'limit' | 'market' | 'market_by_quote' | 'limit_stop_loss';
interface Order {
    symbol: string;
    type: OrderType;
    amount: number;
    price: number;
}
interface AccountInfo {
    email: string;
    kunaid: string;
    two_factor: boolean;
    withdraw_confirmation: boolean;
    send_order_notice: boolean;
    newsletter: boolean;
    send_withdraw_notice: boolean;
    send_signin_notice: boolean;
    public_keys: {
        deposit_sdk_uah_public_key: string;
        deposit_sdk_usd_public_key: string;
        deposit_sdk_rub_public_key: string;
        deposit_sdk_uah_worldwide_public_key: string;
    };
    announcements: boolean;
    sn: string;
    activated: boolean;
    verifications: {
        status: string;
        identity: string | null;
    };
}
export { AccountInfo };
export default class KunaPrivate extends KunaPublic implements KunaApiPrivate {
    private publicKey;
    private secretKey;
    constructor({ publicKey, secretKey }: IKeys);
    /**
     *  Get account info
     */
    getAccountInfo(): Promise<AccountInfo>;
    /**
     * Account balance
     */
    accountBalance(): Promise<any>;
    /**
     * Create an order
     * @param {Order} order
     * @description https://docs.kuna.io/docs/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80-1
     */
    createOrder(order: Order): Promise<any>;
    /**
     * List of active of orders
     * @param {String} market
     * @description https://docs.kuna.io/docs/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80-1
     */
    getOrders(market: string): Promise<any>;
    /**
     * Cancel an order or orders
     * @param order_ids
     * @description https://docs.kuna.io/docs/%D0%BE%D1%82%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80
     */
    cancelOrder(order_ids: Number | Array<Number>): Promise<any>;
    /**
     * Cancel buy orders
     * @param market
     * @returns
     */
    cancelBuyOrders(market: string): Promise<any>;
    /**
     * Cancel sell orders
     * @param market string
     * @returns Promise-any
     */
    cancelSellOrders(market: string): Promise<any>;
    /**
     * Cancel all orders
     * @param market
     * @returns
     */
    cancelAllOrders(market: string): Promise<any>;
    /**
     * Cancel orders by given side (sell, buy)
     * @param market
     * @param sign
     * @returns
     */
    cancelOrderBySide(market: string, sign: number): Promise<any>;
    /**
     * Get history of assets (withdraws/deposits)
     * @param {String} type (withdraws, deposits)
     * @description https://docs.kuna.io/docs/get-deposits-and-withdrawals-history
     */
    getAssetsHistory(type?: string): Promise<any>;
    /**
     * Get executed orders
     * @param {String} market
     * @description https://docs.kuna.io/docs/%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%80%D0%B4%D0%B5%D1%80%D0%BE%D0%B2
     */
    getExecutedOrders(market: string): Promise<any>;
    /**
     * List of trades by order
     * @param {String} market
     * @param {String} order_id
     * @description https://docs.kuna.io/docs/%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%80%D0%B4%D0%B5%D1%80%D0%BE%D0%B2
     */
    getTradesByOrderId(market: string, order_id: string): Promise<any>;
    /**
     * Create signature
     * @param {String} url_api
     * @param {Number} nonce
     * @param {Object} body
     */
    getSignature(url_api: string, nonce: number, body: object): string;
    /**
     * Make an authed call
     * @param {String} action route path
     * @param {String} method http-method (post, put, delete, ...)
     * @param {Object} payload
     */
    authedRequest(url_api: string, method?: Method, payload?: object): Promise<any>;
}
