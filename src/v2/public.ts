/**
*   API KUNA - V2 - public
*
*/

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
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
    return this.request({
      url: '/timestamp',
      method: 'GET',
      params: { },
    })
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
    return this.request({
      url: '/tickers/' + market,
      method: 'GET',
      params: { },
    })
    .then(({ticker}) => ticker)
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
    return this.request({
      url: '/order_book?market=' + market,
      method: 'GET',
      params: { },
    })
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
    return this.request({
      url: '/trades?market=' + market,
      method: 'GET',
      params: { },
    })
  }

  /**
   * Make a request
   * @param requestConfig AxiosRequestConfig
   */
  request(requestConfig: AxiosRequestConfig) : Promise<any> {
    requestConfig.url = this.api + requestConfig.url
    return axios
      .request(requestConfig)
      .then((r: AxiosResponse) => r.data)
  }
}


