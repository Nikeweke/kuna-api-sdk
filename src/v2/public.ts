/**
*   API KUNA - V2 - public
*
*/

import axios, { AxiosResponse, Method } from 'axios'
import { KunaApiPublic } from '../interfaces'

type Trend = 
  | 'buy'
  | 'sell'

interface HistoryTradeItem {
  id: number
  price: string
  volume: string
  funds: string
  market: string // btcuah, ...
  created_at: string
  side: null
  trend: Trend
}

export default class KunaPublic implements KunaApiPublic {
  protected api: string  = 'https://kuna.io/api/v2'

  /**
   * Get unixtime
   * @description https://kuna.io/api/v2/timestamp
   */
  getUnixTime() : Promise<string> {
    return this
      .request('/timestamp')
      .then((unixTime: Number) => unixTime + '000')
  }

  /**
   * Ticker (last info about market)
   * @param market
   * @description https://kuna.io/api/v2/tickers/btcuah
   */
  getTicker(market: string) : Promise<Object> {
    if (!market) {
      return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
    }
    return this.request('/tickers/' + market).then(({ticker}) => ticker)
  }

  /**
   * Order book
   * @param market
   * @description https://kuna.io/api/v2/order_book?market=btcuah
   */
  getOrderBook(market: string) : Promise<Object> {
    if (!market) {
      return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
    }
    return this.request('/order_book?market=' + market)
  }

  /**
   * History trades
   * @param market
   * @description https://kuna.io/api/v2/trades?market=btcuah
   */
  getHistoryTrades(market: string) : Promise<Array<HistoryTradeItem>> {
    if (!market) {
      return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
    }
    return this.request('/trades?market=' + market)
  }

  /**
   * Make an request 
   * @param url_api
   * @param method
   * @param payload
   */
  request(url_api: string, method: Method = 'GET', payload: object = {}) : Promise<any> {
    const url = this.api + url_api
    return axios
      .request({ url, method, data: payload })
      .then((res: AxiosResponse) => res.data)
  }
}


