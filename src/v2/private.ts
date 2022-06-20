/**
*   API KUNA - V2 - private
*
*/
import { AxiosRequestConfig, Method } from 'axios'
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
    return this.addAuth({
      url: '/orders',
      method: 'GET',
      params: { market },
    }).then(this.request.bind(this))
  }

  /**
   * Info about user and assets
   * @description https://kuna.io/api/v2/members/me
   */
  getAccountInfo() : Promise<AccountInfo> {
    return this.addAuth({
      url: '/members/me',
      method: 'GET',
      params: {},
    }).then(this.request.bind(this))
  }


  /**
   * Отмена ордера
   * @param order_id 
   * @description {POST} https://kuna.io/api/v2/order/delete
   */
  cancelOrder(order_id: number) {
    return this.addAuth({
      url: '/order/delete',
      method: 'POST',
      params: {id: order_id},
    }).then(this.request.bind(this))
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
  makeOrder(order: Order) : Promise<any> {
    return this.addAuth({
      url: '/orders',
      method: 'POST',
      params: order,
      data: order,
    }).then(this.request.bind(this))
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
    return this.addAuth({
      url: '/trades/my',
      method: 'GET',
      params: { market },
    }).then(this.request.bind(this))
  }

  /**
   * Get signature
   * @param url_api
   * @param nonce
   * @param body
   */
  getSignature(method: Method, url: string, queryParams: string) : string {
    const signatureString = `${method}|/api/v2${url}|${queryParams}`;
    return crypto
      .createHmac('sha256', this.secretKey)
      .update(signatureString)
      .digest('hex');
  }

  async addAuth(requestConfig: AxiosRequestConfig) : Promise<AxiosRequestConfig> {
    const { params, url, method } = requestConfig

    // nonce 
    const tonce = await this.getUnixTime()
    let queryParams = toQueryParams({
      access_key: this.accessKey,
      tonce,
      ...params,
    })

    // signature
    const signature = this.getSignature(method as Method, url as string, queryParams)
    queryParams += `&signature=${signature}`

    // preparing axios request
    requestConfig.url = `${url}?${queryParams}`

    return requestConfig
  }
}


