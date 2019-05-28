/**
*   API KUNA - V2 - public
*
*/

const axios = require('axios')

function KunaAPI (market) {
  this.market = market
  this.api  = 'https://kuna.io/api/v2'
} 

/**
 * Последние данные по рынку
 * @description https://kuna.io/api/v2/tickers/btcuah
 */
KunaAPI.prototype.getCurrency = function () {
  if (!this.market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.req('/tickers/' + this.market).then(({ticker}) => ticker)
}

/**
 * Биржевой стакан
 * @description https://kuna.io/api/v2/order_book?market=btcuah
 */
KunaAPI.prototype.getBirgaStakan = function () {
  if (!this.market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.req('/order_book?market=' + this.market)
}

/**
 * История торгов
 * @description https://kuna.io/api/v2/trades?market=btcuah
 */
KunaAPI.prototype.getHistoryTrades = function () {
  if (!this.market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.req('/trades?market=' + this.market)
}

/**
 * Забрать время Юникс
 * @description https://kuna.io/api/v2/timestamp
 */
KunaAPI.prototype.getUnixTime = function () {
  return this.req('/timestamp').then((unixTime) => unixTime + '000')
}

/**
 * Сделать запрос
 * @param {String} url_api
 * @param {String} method
 * @param {Object} postData
 */
KunaAPI.prototype.req = function (url_api, method, postData) {
  url      = this.api + url_api
  method   = method   || 'get'
  postData = postData || {}

  return axios[method](url, {})
    .then(({data}) => data )
    .catch((error) => {
      if (error.response != undefined) {
        console.log('ERROR')
        // console.log(error)

      } else {
        console.log('ERROR 2')
        console.log(error)
      }
    })
}

module.exports = KunaAPI


