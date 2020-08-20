/**
*   API KUNA - V3 - public
*
*/

const axios = require('axios')

function KunaPublic () {
  this.api  = 'https://api.kuna.io/v3/'
} 

/**
 * Забрать время Юникс
 * @description https://kuna.io/api/v3/timestamp
 */
KunaPublic.prototype.getUnixTime = function(){
  return this.request('timestamp').then((data) => data.timestamp_miliseconds)
}

/**
 * Список доступных валют
 * @description https://api.kuna.io/v3/currencies
 */
KunaPublic.prototype.getCurrencies = function() {
  return this.request(`currencies`)
}

/**
 * Рынки
 * @description https://api.kuna.io/v3/markets
 */
KunaPublic.prototype.getMarkets = function() {
  return this.request(`markets`)
}

/**
 * Последние данные по рынку
 * @description https://api.kuna.io/v3/tickers?symbols=btcuah
 */
KunaPublic.prototype.getTickers = function(market) {
  if (!market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.request(`tickers?symbols=${market}`)
}

/**
 * Биржевой стакан
 * @description https://api.kuna.io/v3/book/{symbol}
 */
KunaPublic.prototype.getOrderBook = function(market) {
  if (!market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.request('book/' + market)
}


/**
 * Комиссии на ввод и вывод
 * @description https://api.kuna.io/v3/fees
 */
KunaPublic.prototype.getFees = function() {
  return this.request('fees')
}


/**
 * Сделать запрос
 * @param {String} url_api
 * @param {String} method
 * @param {Object} postData
 */
KunaPublic.prototype.request = function(url_api, method, postData) {
  url      = this.api + url_api
  method   = method   || 'get'
  postData = postData || {}

  return axios[method](url, {})
    .then(({data}) => data )
    // .catch((error) => {
    //   if (error.response != undefined) {
    //     console.log('ERROR')
    //     console.log(error.message)

    //   } else {
    //     console.log('ERROR 2')
    //     console.log(error)
    //   }
    // })
}




module.exports = KunaPublic


