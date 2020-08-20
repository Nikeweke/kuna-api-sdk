# Kuna API SDK

### Quick start
```js
// 1. set a tokens
process.env.KUNA_ACCES_TOKEN = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
process.env.KUNA_SECRET_TOKEN = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
// or use dotenv package with .env
// require('dotenv').config() 

// 2. you can use api V2 or V3 
// const { KunaPublic, KunaPrivate } = require('kuna-api-sdk/v2')
const { KunaPublic, KunaPrivate } = require('kuna-api-sdk/v3')

// public api (you need set pair)
let kunaPublic = new KunaPublic()
let kunaPrivate = new KunaPrivate()

kunaPublic.getTickers('btcuah')
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err))

KunaPrivate.accountInfo(')
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err))
```

### API V2
#### kunaPublic
* `.getCurrency()` - Последние данные по рынку 
* `.getBirgaStakan()` - Биржевой стакан
* `.getHistoryTrades()` -  История торгов
* `.getUnixTime()` -  Забрать время Юникс
* `.request()` -  Сделать запрос

#### kunaPrivate.
* `.getOrders('btcuah')` - Активные ордера пользователя 
* `.getInfoUser()` -  Информация о пользователе и активах 
* `.cancelOrder(order_id)` - Отмена ордера
* `.makeOrder({side, volume, market, price})` - Выставить ордер 
* `.getTrades ('btcuah')` - История сделок пользователя 
* `.authedRequest()` -  Сделать запрос с авторизационными заголовками и подписью
* `.getSignature(method, url, queryParams)` - Создать подпись

### API V3
#### kunaPublic
* `.getUnixTime()` - Забрать время Юникс
* `.getCurrencies()` - Список доступных валют
* `.getMarkets()` - Рынки
* `.getTickers()` - Последние данные по рынку
* `.getOrderBook()` - Биржевой стакан
* `.getFees()` - Комиссии на ввод и вывод
* `.request()` - Сделать запрос

#### kunaPrivate
* `.accountInfo()` - Данные аккаунта
* `.accountBalance()` -  Баланс аккаунта 
* `.createOrder({symbol, type, amount, price})` - Создать ордер
* `.getActiveOrders(market)` - Список активных ордеров
* `.cancelOrder(order_id)` - Отменить ордер
* `.getAssetsHistory(type)` -  Получить историю депозитов и выводов
* `.getExecutedOrders(market)` -  Список исполненных ордеров
* `.getTradesByOrderId(market, order_id)` -  Список сделок по ордеру
* `.authedRequest()` -  Сделать запрос с авторизационными заголовками и подписью
* `.getSignature(url_api, nonce, body)` - Создать подпись
