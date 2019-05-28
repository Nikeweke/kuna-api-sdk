/**
*   API KUNA - V2 - private
*
*/
const KunaAPI     = require('./kuna-api')

const url         = require('url')
const queryString = require('query-string')
const hmacSHA256  = require('crypto-js/hmac-sha256')
const encHex      = require('crypto-js/enc-hex')

function KunaPrivateAPI () {
  KunaAPI.call(this)
  this.kunaPathname = url.parse(this.api).pathname
  this.access_key = process.env.KUNA_ACCES_TOKEN  
  this.secret_key = process.env.KUNA_SECRET_TOKEN  
  this.tonce      = 0          // временная метка unix
  this.query_params = ''
  this.url_params   = ''
  this.signature    = ''
} 
KunaPrivateAPI.prototype = Object.create(KunaAPI.prototype) // extends KunaAPI

/**
 * Активные ордера пользователя
 * @param {String} market its a pair of crypto (btcuah, ethuah)
 * @description https://kuna.io/api/v2/orders
 */
KunaPrivateAPI.prototype.getOrders = function (market) {
  if (!market) {
    return Promise.reject('Pass a pair of crypto (btcuah, ethuah)')
  }
  
  let data = {
    method: 'GET',
    url: '/orders',
    params: {market: 'btcuah'}
  }
  return this.prepareUrl(data)
    .then((url) => this.req(url))
}

/**
 * Информация о пользователе и активах 
 * @description https://kuna.io/api/v2/members/me
 */
KunaPrivateAPI.prototype.getInfoUser = function () {
  let data = {
    method: 'GET',
    url: '/members/me',
    params: null
  }
  return this.prepareUrl(data)
    .then((url) => this.req(url))
}


/**
 * Отмена ордера
 * @description {POST} https://kuna.io/api/v2/order/delete
 */
KunaPrivateAPI.prototype.cancelOrder = function (order_id) {
  let data = {
    method: 'POST',
    url: '/order/delete',
    params: {id: order_id}
  }
  return this.prepareUrl(data)
    .then((url) => this.req(url))
}

/**
 * Выставить ордер 
 * @param {Object} order {market, price, side, volume}
 * @param  side — buy или sell
 * @param  volume — объём ордера в биткоинах
 * @param  market — btcuah
 * @param  price — цена за один биткоин
 * @description {POST}  https://kuna.io/api/v2/orders
 */
KunaPrivateAPI.prototype.makeOrder = function (order) {
  let data = {
    method: 'POST',
    url: '/orders',
    params: {
      ...order
    }
  }

  return this.prepareUrl(data)
    .then((url) => this.req(url))
}

/**
 * История сделок пользователя 
 * @param  market pair of crypto(btcuah)
 * @description https://kuna.io/api/v2/trades/my
 */
KunaPrivateAPI.prototype.getTrades = function (market) {
  if (!market) {
    return Promise.reject('Pass a pair of crypto (btcuah, ethuah)')
  }

  let data = {
    method: 'GET',
    url: '/trades/my',
    params: {market}
  }
  return this.prepareUrl(data)
    .then((url) => this.req(url))
}

/**
 * Preparing url - getting tonce, making query params and signature, making url
 * @param {Object} data
 */
KunaPrivateAPI.prototype.prepareUrl = function ({method, url, params}) {
  return this.getUnixTime()
    .then((tonce) => {
      // making string of query params
      let queryParams = queryString.stringify({
        access_key: this.access_key,
        tonce,
        ...params
      })

      let signature = encHex.stringify(
        hmacSHA256(
          `${method}|/api/v2${url}|${queryParams}`, 
          this.secret_key
        )
      )

      // adding to all params - signature
      queryParams += `&signature=${signature}`
    
      return `${url}?${queryParams}`
    })
}

module.exports = KunaPrivateAPI


