/**
*   API KUNA - V3 - private
*
*/

const axios = require('axios-https-proxy-fix')
const crypto = require('crypto');

const KunaPublic = require('./public')

function KunaPrivate({ publicKey, secretKey }) {
  KunaPublic.call(this)
  this.publicKey = publicKey 
  this.secretKey = secretKey
  this.tonce      = 0  // временная метка unix
  this.query_params = ''
  this.url_params   = ''
  this.signature    = ''
} 
KunaPrivate.prototype = Object.create(KunaPublic.prototype) // extends KunaAPI


/**
 * Данные аккаунта
 */
KunaPrivate.prototype.accountInfo = async function () {
  const url = 'auth/me' 
  const method = 'post'
  return this.authedRequest(url, method)
}

/**
 * Баланс аккаунта
 */
KunaPrivate.prototype.accountBalance = async function () {
  const url = 'auth/r/wallets' 
  const method = 'post'
  return this.authedRequest(url, method)
}

/**
 * Создать ордер
 * @param {Object} order {symbol, type [limit, market, market_by_quote], amount, price}
 * @description https://docs.kuna.io/docs/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80-1
 */
KunaPrivate.prototype.createOrder = async function (order) {
  const url = 'auth/w/order/submit' 
  const method = 'post'
  return this.authedRequest(url, method, order)
}

/**
 * Список активных ордеров
 * @param {String} market 
 * @description https://docs.kuna.io/docs/%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80-1
 */
KunaPrivate.prototype.getActiveOrders = async function (market) {
  const url = `auth/r/orders/${market}` 
  const method = 'post'
  return this.authedRequest(url, method)
}

/**
 * Отменить ордер
 * @param {Object} order 
 * @description https://docs.kuna.io/docs/%D0%BE%D1%82%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C-%D0%BE%D1%80%D0%B4%D0%B5%D1%80
 */
KunaPrivate.prototype.cancelOrder = async function (order_id) {
  const url = `order/cancel` 
  const method = 'post'
  const body = { order_id }
  // const body = { order_ids: [12332] } // DOES NOT WORK if ARRAY
  return this.authedRequest(url, method, body)
}

// ===================================================================> EXPERIMENTAL
KunaPrivate.prototype.cancelBuyOrders = async function (market) {
  this.cancelOrderBySide(market, 1)
}

KunaPrivate.prototype.cancelSellOrders = async function (market) {
  this.cancelOrderBySide(market, -1)
}

KunaPrivate.prototype.cancelAllOrders = async function (market) {
  await this.cancelOrderBySide(market, 1)
  this.cancelOrderBySide(market, -1)
}

KunaPrivate.prototype.cancelOrderBySide = async function(market, sign) {
  const sleep = (delay = 800) => new Promise((res) => setTimeout(res, delay))
  const orders = await this.getActiveOrders(market)
  if (orders.length === 0) return 
  for (let order of orders) {
    if (Math.sign(order[7]) === sign) {
      await this.cancelOrder(order[0])
      console.log(`order ${order[0]} cancelled`)
      await sleep()
    } 
  }
}
// ===================================================================> EXPERIMENTAL

/**
 * Получить историю депозитов и выводов
 * @param {String} type (withdraws, deposits)
 * @description https://docs.kuna.io/docs/get-deposits-and-withdrawals-history
 */
KunaPrivate.prototype.getAssetsHistory = async function (type = '') {
  if (type) type = '/'+type
  const url = `auth/assets-history` + type 
  const method = 'post'
  return this.authedRequest(url, method)
}



/**
 * Список исполненных ордеров
 * @param {String} market 
 * @description https://docs.kuna.io/docs/%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%80%D0%B4%D0%B5%D1%80%D0%BE%D0%B2
 */
KunaPrivate.prototype.getExecutedOrders = async function (market) {
  const url = `auth/r/orders/${market}/hist`
  const method = 'post'
  return this.authedRequest(url, method)
}

/**
 * Список сделок по ордеру
 * @param {String} market 
 * @param {String} order_id 
 * @description https://docs.kuna.io/docs/%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%BE%D1%80%D0%B4%D0%B5%D1%80%D0%BE%D0%B2
 */
KunaPrivate.prototype.getTradesByOrderId = async function (market, order_id) {
  const url = `auth/r/order/${market}:${order_id}/trades`
  const method = 'post'
  return this.authedRequest(url, method)
}


/**
 * Сделать запрос
 * @param {String} url_api
 * @param {String} method
 * @param {Object} body
 */
KunaPrivate.prototype.authedRequest = async function(url_api, method, body = {}) {
  // nonce 
  const nonce = await this.getUnixTime()
  // signature
  const signature = this.getSignature(url_api, nonce, body)

  // preparing axios request
  url      = this.api + url_api
  method   = method   || 'get'
  const options = {
    headers: {
      'kun-nonce': nonce,
      'kun-apikey': this.publicKey,
      'kun-signature': signature,
      'accept': 'application/json',
    }
  }

  return axios[method](url, body, options)
    .then(({data}) => data)
    // .catch((error) => {
    //   if (error.response != undefined) {
    //     console.log('ERROR: ', error.response.data)
    //     // console.log(error)
    //   } else {
    //     console.log('ERROR 2')
    //     console.log(error)
    //   }
    // })
}

/**
 * Создать подпись
 * @param {String} url_api
 * @param {Number} nonce
 * @param {Object} body
 */
KunaPrivate.prototype.getSignature = function(url_api, nonce, body) {
  const apiPath = `/v3/${url_api}`;
  const signatureString = `${apiPath}${nonce}${JSON.stringify(body)}`;

  // console.log(signatureString)

  const signature = crypto
    .createHmac('sha384', this.secretKey)
    .update(signatureString)
    .digest('hex');

  return signature
}





module.exports = KunaPrivate


