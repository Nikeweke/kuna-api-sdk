// 1. init a keys
const keys = {
  publicKey: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
  secretKey: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
}

// 2. you can use api V2 or V3 
const kuna = require('./dist').v3(keys) // { public:..., private:... }
const kunaV2 = require('./dist').v2(keys)

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