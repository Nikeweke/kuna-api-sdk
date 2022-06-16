/**
*   API KUNA - V3 - public
*/
import axios, { AxiosResponse, Method } from 'axios'

export default class KunaPublic {
  protected api: string = 'https://api.kuna.io/v3/'

  /**
   * Get unixtime
  * @description https://kuna.io/api/v3/timestamp
   */
  getUnixTime() : Promise<number> {
    return this.request('timestamp').then(
      (data) => data.timestamp_miliseconds
    )
  }

  /**
   * List of available currencies
   * @description https://api.kuna.io/v3/currencies
   */
  getCurrencies() : Promise<any> {
    return this.request(`currencies`)
  }

  /**
   * Markets
   * @description https://api.kuna.io/v3/markets
   */
  getMarkets() : Promise<any> {
    return this.request(`markets`)
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
    return this.request(`tickers?symbols=${market}`)
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
    return this.request('book/' + market)
  }


  /**
   * Fees for deposit and withdraws
   * @description https://api.kuna.io/v3/fees
   */
  getFees() : Promise<any> {
    return this.request('fees')
  }

  request(url_api: string, method: Method = 'GET', payload: object = {}) : Promise<any> {
    const url = this.api + url_api
    return axios
      .request({ url, method, data: payload })
      .then((res: AxiosResponse) => res.data)
  }
}
