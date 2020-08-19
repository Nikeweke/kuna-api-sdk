/**
*   API KUNA - V2 - private
*
*/
const KunaAPI     = require('./public')

const axios = require('axios')
const queryString = require('query-string')
const hmacSHA256  = require('crypto-js/hmac-sha256')
const encHex      = require('crypto-js/enc-hex')

function KunaPrivate () {
  KunaAPI.call(this)
  this.accessKey = process.env.KUNA_PUBLIC_TOKEN  
  this.secretKey = process.env.KUNA_SECRET_TOKEN  
  this.tonce      = 0          // временная метка unix
  this.query_params = ''
  this.url_params   = ''
  this.signature    = ''
} 
KunaPrivate.prototype = Object.create(KunaAPI.prototype) // extends KunaAPI

/**
 * Активные ордера пользователя
 * @param {String} market its a pair of crypto (btcuah, ethuah)
 * @description https://kuna.io/api/v2/orders
 */
KunaPrivate.prototype.getOrders = function (market) {
  if (!market) {
    return Promise.reject('Pass a pair of crypto (btcuah, ethuah)')
  }

  const url = '/orders'
  const method = 'GET'
  const params = {market: 'btcuah'}
  return this.authedRequest(url, method, params)
}

/**
 * Информация о пользователе и активах 
 * @description https://kuna.io/api/v2/members/me
 */
KunaPrivate.prototype.getInfoUser = function () {
  const url = '/members/me'
  const method = 'GET'
  const params = null
  return this.authedRequest(url, method, params)
}


/**
 * Отмена ордера
 * @description {POST} https://kuna.io/api/v2/order/delete
 */
KunaPrivate.prototype.cancelOrder = function (order_id) {
  const url = '/order/delete'
  const method = 'POST'
  const params = {id: order_id}
  return this.authedRequest(url, method, params)
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
KunaPrivate.prototype.makeOrder = function (order) {
  const url = '/orders'
  const method = 'POST'
  const params = { ...order }
  const body = order
  return this.authedRequest(url, method, params, body)
}

/**
 * История сделок пользователя 
 * @param  market pair of crypto(btcuah)
 * @description https://kuna.io/api/v2/trades/my
 */
KunaPrivate.prototype.getTrades = function (market) {
  if (!market) {
    return Promise.reject('Pass a pair of crypto (btcuah, ethuah)')
  }
  const url = '/trades/my'
  const method = 'GET'
  const params = { market }
  return this.authedRequest(url, method, params)
}

/**
 * Сделать запрос
 * @param {String} url_api
 * @param {String} method
 * @param {Object} params
 * @param {Object} body
 */
KunaPrivate.prototype.authedRequest = async function(url_api, method, params, body = {}) {
  // nonce 
  const tonce = await this.getUnixTime()
  // queryParams
  let queryParams = queryString.stringify({
    accessKey: this.accessKey,
    tonce,
    ...params
  })
  // signature
  const signature = this.getSignature(method, url_api, queryParams)
  queryParams += `&signature=${signature}`

  // preparing axios request
  url      = `${this.api}${url_api}?${queryParams}`
  method   = method.toLowerCase()   || 'get'
  const options = {}

  return axios[method](url, body, options)
    .then(({data}) => data)
    .catch((error) => {
      console.log(error.response.data)
      if (error.response != undefined) {
        console.log('ERROR')
        // console.log(error)
      } else {
        console.log('ERROR 2')
        console.log(error)
      }
    })
}

/**
 * Создать подпись
 * @param {String} url_api
 * @param {Number} nonce
 * @param {Object} body
 */
KunaPrivate.prototype.getSignature = function(method, url, queryParams) {
  const signatureString = `${method}|/api/v2${url}|${queryParams}`;
  let signature = encHex.stringify(
    hmacSHA256(
      signatureString, 
      this.secretKey
    )
  )
  return signature
}

module.exports = KunaPrivate


