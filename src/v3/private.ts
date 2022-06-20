import axios, { Method, AxiosResponse, AxiosRequestHeaders, AxiosRequestConfig } from "axios"
import crypto from 'crypto'

import KunaPublic from "./public"
import { IKeys, KunaApiPrivate } from '../interfaces'

type OrderType = 
  | 'limit'
  | 'market' 
  | 'market_by_quote'
  | 'limit_stop_loss' 

interface Order {
  symbol: string
  type: OrderType,
  amount: number
  price: number
}

interface AccountInfo {
  email: string
  kunaid: string
  two_factor: boolean
  withdraw_confirmation: boolean
  send_order_notice: boolean
  newsletter: boolean
  send_withdraw_notice: boolean
  send_signin_notice: boolean
  public_keys: {
    deposit_sdk_uah_public_key: string,
    deposit_sdk_usd_public_key: string
    deposit_sdk_rub_public_key: string
    deposit_sdk_uah_worldwide_public_key: string
  }
  announcements: boolean
  sn: string
  activated: boolean
  verifications: { status: string, identity: string | null }
}

export { AccountInfo }

export default class KunaPrivate extends KunaPublic implements KunaApiPrivate {
  private publicKey: string = '' 
  private secretKey: string = ''

  constructor({publicKey = '', secretKey = ''}: IKeys) {
    super()
    this.publicKey = publicKey
    this.secretKey = secretKey
  }

  /**
   *  Get account info
   */
  getAccountInfo() : Promise<AccountInfo> {
    return this.addAuth({
      url: `auth/me`,
      method: 'post',
      data: {},
    }).then(this.request.bind(this))
  }

  /**
   * Account balance
   */
  accountBalance() : Promise<any> {
    return this.addAuth({
      url: `auth/r/wallets`,
      method: 'post',
      data: {},
    }).then(this.request.bind(this))
  }

  
  /**
   * Create an order 
   * @param {Order} order 
   * @description https://docs.kuna.io/docs/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80-1
   */
  createOrder(order: Order) : Promise<any> {
    return this.addAuth({
      url: `auth/w/order/submit`,
      method: 'post',
      data: order
    }).then(this.request.bind(this))
  }

  /**
   * List of active of orders 
   * @param {String} market 
   * @description https://docs.kuna.io/docs/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80-1
   */
  getOrders(market: string) : Promise<any> {
    return this.addAuth({
      url: `auth/r/orders/${market}`,
      method: 'post',
      data: {},
    }).then(this.request.bind(this))
  }

  /**
   * Cancel an order or orders 
   * @param order_ids 
   * @description https://docs.kuna.io/docs/%D0%BE%D1%82%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80
   */
  cancelOrder(order_ids: Number | Array<Number>) : Promise<any> {
    return this.addAuth({
      url: `order/cancel/multi`,
      method: 'post',
      data: { order_ids: Array.isArray(order_ids) ? order_ids : [order_ids] }
    }).then(this.request.bind(this))
  }

  
  // ===================================================================> EXPERIMENTAL
  /**
   * Cancel buy orders 
   * @param market 
   * @returns 
   */
  cancelBuyOrders(market: string) : Promise<any> {
    return this.cancelOrderBySide(market, 1)
  }

  /**
   * Cancel sell orders 
   * @param market string  
   * @returns Promise-any
   */
  cancelSellOrders(market: string) : Promise<any> {
    return this.cancelOrderBySide(market, -1)
  }

  /**
   * Cancel all orders 
   * @param market 
   * @returns 
   */
  cancelAllOrders(market: string) : Promise<any> {
    return this.cancelOrderBySide(market, 1)
    .then(() => this.cancelOrderBySide(market, -1))
  }

  /**
   * Cancel orders by given side (sell, buy)
   * @param market 
   * @param sign 
   * @returns 
   */
  async cancelOrderBySide(market: string, sign: number) : Promise<any> {
    const orders = await this.getOrders(market)
    if (!orders.length) return 

    const ordersToCancel = orders.filter(
      (item: Array<any>) => Math.sign(item[7]) === sign
    )
    if (!ordersToCancel.length) return 
      
    const ordersIds = ordersToCancel.map(
      (item: Array<any>) => item[0]
    )
    await this.cancelOrder(ordersIds)
  }
  // ===================================================================> EXPERIMENTAL

  /**
   * Get history of assets (withdraws/deposits)
   * @param {String} type (withdraws, deposits)
   * @description https://docs.kuna.io/docs/get-deposits-and-withdrawals-history
   */
  getAssetsHistory(type: string = '') : Promise<any> {
    if (type) type = '/' + type
    return this.addAuth({
      url: `auth/assets-history${type}`,
      method: 'post',
      data: {},
    }).then(this.request.bind(this))
  }

  /**
   * Get executed orders 
   * @param {String} market 
   * @description https://docs.kuna.io/docs/%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%80%D0%B4%D0%B5%D1%80%D0%BE%D0%B2
   */
  getExecutedOrders(market: string) : Promise<any> {
    return this.addAuth({
      url: `auth/r/orders/${market}/hist`,
      method: 'post',
      data: {},
    }).then(this.request.bind(this))
  }

  /**
   * List of trades by order 
   * @param {String} market 
   * @param {String} order_id 
   * @description https://docs.kuna.io/docs/%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%80%D0%B4%D0%B5%D1%80%D0%BE%D0%B2
   */
  getTradesByOrderId(market: string, order_id: string) : Promise<any> {
    return this.addAuth({
      url: `auth/r/order/${market}:${order_id}/trades`,
      method: 'post',
      data: {},
    }).then(this.request.bind(this))
  }

  /**
   * Create signature
   * @param {String} url_api
   * @param {Number} nonce
   * @param {Object} body
   */
  getSignature(url_api: string, nonce: number, body: object) {
    const apiPath = `/v3/${url_api}`;
    const signatureString = `${apiPath}${nonce}${JSON.stringify(body)}`;
    return crypto
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
  async addAuth(requestConfig: AxiosRequestConfig) : Promise<AxiosRequestConfig> {
    const nonce = await this.getUnixTime()
    const signature = this.getSignature(requestConfig.url as string, nonce, requestConfig.data)
    requestConfig.headers = <AxiosRequestHeaders>({
      'kun-nonce': nonce,
      'kun-apikey': this.publicKey,
      'kun-signature': signature,
      'accept': 'application/json',
    })
    return requestConfig
  }
}




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

