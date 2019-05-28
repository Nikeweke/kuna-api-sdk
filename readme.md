# Kuna API SDK

### Quick start
```js
// 1. set a tokens
process.env.KUNA_ACCES_TOKEN = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
process.env.KUNA_SECRET_TOKEN = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
// or use dotenv package with .env

// 2. use it
const { KunaAPI, KunaPrivateAPI} = require('./kuna-sdk')

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


### API

#### KunaAPI.
* getCurrency()
* getBirgaStakan()
* getHistoryTrades()
* getUnixTime()

#### KunaPrivateAPI.
* getOrders('btcuah') 
* getInfoUser()
* cancelOrder(order_id)
* makeOrder({side, volume, market, price})
* getTrades ('btcuah')
* prepareUrl({method, url, params})