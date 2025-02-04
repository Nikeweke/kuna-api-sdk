/**
*   API KUNA - V3 - public
*/
import axios, { AxiosResponse, Method, AxiosRequestConfig } from 'axios'
import { KunaApiPublic } from '../interfaces'

export default class KunaPublic implements KunaApiPublic {
  protected api: string = 'https://api.kuna.io/v3/'

  /**
   * Get unixtime
  * @description https://api.kuna.io/v3/timestamp
   */
  getUnixTime() : Promise<number> {
    return this.request({
      url: 'timestamp',
      method: 'GET',
      params: { },
    }).then(
      (data) => data.timestamp_miliseconds
    )
  }

  /**
   * List of available currencies
   * @description https://api.kuna.io/v3/currencies
   */
  getCurrencies() : Promise<any> {
    return this.request({
      url: 'currencies',
      method: 'GET',
      params: { },
    })
  }

  /**
   * Markets
   * @description https://api.kuna.io/v3/markets
   */
  getMarkets() : Promise<any> {
    return this.request({
      url: 'markets',
      method: 'GET',
      params: { },
    })
  }

  /**
   * Ticker for market
   * @param market
   * @description https://api.kuna.io/v3/tickers?symbols=btcuah
   */
  getTicker(market: string) : Promise<any> {
    if (!market) {
      return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
    }
    return this.request({
      url: `tickers?symbols=${market}`,
      method: 'GET',
      params: { },
    })
  }

  /**
   * Order book
   * @param market
   * @description https://api.kuna.io/v3/book/{symbol}
   */
  getOrderBook(market: string) {
    if (!market) {
      return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
    }
    return this.request({
      url: 'book/' + market,
      method: 'GET',
      params: { },
    })
  }

  /**
   * @description Not implemented by KUNA API V3
   * @param market
   */
  getHistoryTrades(market: string): Promise<Array<Object>> {
    return Promise.resolve([
      { message: 'in kuna-api-v3 this action not implemented yet'}
    ])
  }

  /**
   * Fees for deposit and withdraws
   * @description https://api.kuna.io/v3/fees
   */
  getFees() : Promise<any> {
    return this.request({
      url: 'fees',
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
