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
let kunaBTCUAH = new KunaPublic('btcuah')
let kunaPrivate = new KunaPrivate()

kunaBTCUAH.getTickers()
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err))

KunaPrivate.accountInfo(')
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err))
```

### API V2
#### KunaPublic
* `.getCurrency()` - Последние данные по рынку 
* `.getBirgaStakan()` - Биржевой стакан
* `.getHistoryTrades()` -  История торгов
* `.getUnixTime()` -  Забрать время Юникс

#### KunaPrivate.
* `.getOrders('btcuah')` - Активные ордера пользователя 
* `.getInfoUser()` -  Информация о пользователе и активах 
* `.cancelOrder(order_id)` - Отмена ордера
* `.makeOrder({side, volume, market, price})` - Выставить ордер 
* `.getTrades ('btcuah')` - История сделок пользователя 
* `.prepareUrl({method, url, params})` - подготовка адреса для запроса

### API V3
#### KunaPublic
* `.getUnixTime()` - Забрать время Юникс
* `.getCurrencies()` - Список доступных валют
* `.getMarkets()` - Рынки
* `.getTickers()` - Последние данные по рынку
* `.getOrderBook()` - Биржевой стакан
* `.getFees()` - Комиссии на ввод и вывод
* `.request()` - Сделать запрос

#### KunaPrivate
* `.getOrders('btcuah')` - Активные ордера пользователя 
* `.getInfoUser()` -  Информация о пользователе и активах 
* `.cancelOrder(order_id)` - Отмена ордера
* `.makeOrder({side, volume, market, price})` - Выставить ордер 
* `.getTrades ('btcuah')` - История сделок пользователя 
* `.prepareUrl({method, url, params})` - подготовка адреса для запроса
