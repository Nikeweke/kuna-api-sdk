# Kuna API SDK

> New version(3.0.0) has TS support, tests, a little change of instance init code

### Quick start
```js
// 1. init a keys
const keys = {
  publicKey: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
  secretKey: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
}

// 2. you can use api V2 or V3 
const kuna = require('kuna-api-sdk').v3(keys) // { public:..., private:... }
const kunaV2 = require('kuna-api-sdk').v2(keys) // { public:..., private:... }

// 3. use 
kuna.public.getTicker('btcuah')
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err.message))

kunaV2.public.getTicker('btcuah')
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err.message))

// set keys before use private functions
kuna.private.getAccountInfo()
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err.message))

kunaV2.private.getAccountInfo()
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err.message))
```

### API V2
#### kuna.public.
* `.getTicker('btcuah')` - Последние данные по рынку 
* `.getOrderBook('btcuah')` - Биржевой стакан
* `.getHistoryTrades('btcuah')` -  История торгов
* `.getUnixTime()` -  Забрать время Юникс
* `.request()` -  Сделать запрос

#### kuna.private.
* `.getAccountInfo()` -  Информация о пользователе и активах 
* `.getOrders('btcuah')` - Активные ордера пользователя 
* `.cancelOrder(order_id)` - Отмена ордера
* `.makeOrder({side, volume, market, price})` - Выставить ордер 
* `.getTrades ('btcuah')` - История сделок пользователя 
* `.authedRequest()` -  Сделать запрос с авторизационными заголовками и подписью
* `.getSignature(method, url, queryParams)` - Создать подпись

### API V3
#### kuna.public.
* `.getUnixTime()` - Забрать время Юникс
* `.getCurrencies()` - Список доступных валют
* `.getMarkets()` - Рынки
* `.getTicker('btcuah')` - Последние данные по рынку
* `.getOrderBook()` - Биржевой стакан
* `.getFees()` - Комиссии на ввод и вывод
* `.request()` - Сделать запрос

#### kuna.private.
* `.getAccountInfo()` - Данные аккаунта
* `.accountBalance()` -  Баланс аккаунта 
* `.createOrder({symbol, type, amount, price})` - Создать ордер
* `.getOrders('btcuah')` - Список активных ордеров
* `.cancelOrder(order_id)` - Отменить ордер
* `.getAssetsHistory(type)` -  Получить историю депозитов и выводов
* `.getExecutedOrders(market)` -  Список исполненных ордеров
* `.getTradesByOrderId(market, order_id)` -  Список сделок по ордеру
* `.authedRequest()` -  Сделать запрос с авторизационными заголовками и подписью
* `.getSignature(url_api, nonce, body)` - Создать подпись
* `.cancelBuyOrders(market)` - Отменить ордера на покупку
* `.cancelSellOrders(market)` - Отменить ордера на продажу
* `.cancelOrderBySide(market, sign)` - Отменить ордера по знаку ("-1" - продажа, "1" - покупка)
* `.cancelAllOrders(market)` - Отменить все ордера 
