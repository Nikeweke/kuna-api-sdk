/**
*   API KUNA - V2 - private
*
*/
import axios, { AxiosResponse, Method } from 'axios'
import crypto from 'crypto'

import KunaPublic from "./public"
import { IKeys, KunaApiPrivate } from '../interfaces'
import { toQueryParams } from '../utils'

type OrderSide = 'buy' | 'sell'
interface Order {
  market: string
  price: number
  side: OrderSide
  volume: number
}

interface Asset {
  currency: string
  balance: string
  locked: string
}
interface AccountInfo {
  email: string
  activated: boolean,
  accounts: Array<Asset>
}

export { Asset, AccountInfo, OrderSide, Order }

export default class KunaPrivate extends KunaPublic implements KunaApiPrivate {
  private accessKey: string = '' 
  private secretKey: string = ''

  constructor({publicKey = '', secretKey = ''}: IKeys) {
    super()
    this.accessKey = publicKey
    this.secretKey = secretKey
  }

  /**
   * Get active orders 
   * @param market its a pair of crypto (btcuah, ethuah)
   * @description https://kuna.io/api/v2/orders
   */
  getOrders(market: string) {
    if (!market) {
      return Promise.reject('Pass a pair of crypto (btcuah, ethuah)')
    }
    const url = '/orders'
    const method = 'GET'
    const params = { market }
    return this.authedRequest(url, method, params)
  }

  /**
   * Info about user and assets
   * @description https://kuna.io/api/v2/members/me
   */
  getAccountInfo() : Promise<AccountInfo> {
    const url = '/members/me'
    const method = 'GET'
    const params = {}
    return this.authedRequest(url, method, params)
  }


  /**
   * Отмена ордера
   * @param order_id 
   * @description {POST} https://kuna.io/api/v2/order/delete
   */
  cancelOrder(order_id: number) {
    const url = '/order/delete'
    const method = 'POST'
    const params = {id: order_id}
    return this.authedRequest(url, method, params)
  }


  /**
   * Create an order 
   * @param order [market, price, side, volume]
   * @param  side — buy или sell
   * @param  volume — объём ордера в биткоинах
   * @param  market — btcuah
   * @param  price — цена за один биткоин
   * @description {POST} https://kuna.io/api/v2/orders
   */
  makeOrder(order: Order) {
    const url = '/orders'
    const method = 'POST'
    const params = { ...order }
    const body = order
    return this.authedRequest(url, method, params, body)
  }

  /**
   * Trades history 
   * @param market pair of crypto(btcuah)
   * @description https://kuna.io/api/v2/trades/my
   */
  getTrades(market: string) {
    if (!market) {
      return Promise.reject('Pass a pair of crypto (btcuah, ethuah)')
    }
    const url = '/trades/my'
    const method = 'GET'
    const params = { market }
    return this.authedRequest(url, method, params)
  }

  /**
   * Get signature
   * @param url_api
   * @param nonce
   * @param body
   */
  getSignature(method: Method, url: string, queryParams: string) {
    const signatureString = `${method}|/api/v2${url}|${queryParams}`;
    return crypto
      .createHmac('sha256', this.secretKey)
      .update(signatureString)
      .digest('hex');
  }

  /**
   * Make an authed request
   * @param {String} url_api
   * @param {String} method
   * @param {Object} params
   * @param {Object} body
   */
  async authedRequest(url_api: string, method: Method, params: Object, payload: Object = {}) : Promise<any> {
    // nonce 
    const tonce = await this.getUnixTime()
    let queryParams = toQueryParams({
      access_key: this.accessKey,
      tonce,
      ...params,
    })

    // signature
    const signature = this.getSignature(method, url_api, queryParams)
    queryParams += `&signature=${signature}`

    // preparing axios request
    const url = `${this.api}${url_api}?${queryParams}`

    return axios
      .request({
        url,
        method,
        data: payload,
      })
      .then((res: AxiosResponse) => res.data)
  }
}


