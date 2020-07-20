# Kuna API SDK

### Quick start
```js
// 1. set a tokens
process.env.KUNA_ACCES_TOKEN = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
process.env.KUNA_SECRET_TOKEN = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
// or use dotenv package with .env

// 2. use it
const { KunaAPI, KunaPrivateAPI} = require('kuna-api-sdk')

// public api (you need set pair)
let kunaBTCUAH = new KunaAPI('btcuah')
kunaBTCUAH.getCurrency()
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err))

// private api
let kunaPrivateAPI = new KunaPrivateAPI()
kunaPrivateAPI.getTrades('btcuah')
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err))
```


### Public
* `KunaAPI.getCurrency()` - Последние данные по рынку 
* `KunaAPI.getBirgaStakan()` - Биржевой стакан
* `KunaAPI.getHistoryTrades()` -  История торгов
* `KunaAPI.getUnixTime()` -  Забрать время Юникс

### Private
* `KunaPrivateAPI.getOrders('btcuah')` - Активные ордера пользователя 
* `KunaPrivateAPI.getInfoUser()` -  Информация о пользователе и активах 
* `KunaPrivateAPI.cancelOrder(order_id)` - Отмена ордера
* `KunaPrivateAPI.makeOrder({side, volume, market, price})` - Выставить ордер 
* `KunaPrivateAPI.getTrades ('btcuah')` - История сделок пользователя 
* `KunaPrivateAPI.prepareUrl({method, url, params})` - подготовка адреса для запроса
