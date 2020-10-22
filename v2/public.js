/**
*   API KUNA - V2 - public
*
*/

const axios = require('axios-https-proxy-fix')

function KunaPublic () {
  this.api  = 'https://kuna.io/api/v2'
} 

/**
 * Забрать время Юникс
 * @description https://kuna.io/api/v2/timestamp
 */
KunaPublic.prototype.getUnixTime = function () {
  return this.request('/timestamp').then((unixTime) => unixTime + '000')
}

/**
 * Последние данные по рынку
 * @description https://kuna.io/api/v2/tickers/btcuah
 */
KunaPublic.prototype.getCurrency = function (market) {
  if (!market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.request('/tickers/' + market).then(({ticker}) => ticker)
}

/**
 * Биржевой стакан
 * @description https://kuna.io/api/v2/order_book?market=btcuah
 */
KunaPublic.prototype.getOrderBook = function (market) {
  if (!market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.request('/order_book?market=' + market)
}

/**
 * История торгов
 * @description https://kuna.io/api/v2/trades?market=btcuah
 */
KunaPublic.prototype.getHistoryTrades = function (market) {
  if (!market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.request('/trades?market=' + market)
}



/**
 * Сделать запрос
 * @param {String} url_api
 * @param {String} method
 * @param {Object} postData
 */
KunaPublic.prototype.request = function (url_api, method, postData) {
  url      = this.api + url_api
  method   = method   || 'get'
  postData = postData || {}

  const options = {}

  return axios[method](url, postData, options)
    .then(({data}) => data )
    .catch((error) => {
      if (error.response != undefined) {
        console.log('ERROR')
        console.log(error)

      } else {
        console.log('ERROR 2')
        console.log(error)
      }
    })
}

module.exports = KunaPublic


