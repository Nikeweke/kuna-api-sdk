const keys = {
    publicKey: 'u8vHSYIZy9Dst0qu3J1xrttxoHibCS5miLXrXOoS',
    secretKey: 'b0nsAEq6urPpkpGxzwl7dwvJR4dhwf2VpP4mTIyi',
  };

  const kuna = require('./v3')(keys); 

  kuna.public.checkKunaCode('5jKoj')
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err));

