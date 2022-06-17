import { IKeys } from '../interfaces';
import KunaPrivate from '../v3/private'
 
const KEYS: IKeys = {
  publicKey: process.env.KUNA_PUBLIC_KEY || '',
  secretKey: process.env.KUNA_SECRET_KEY || '',
}

describe('Kuna.private v3:', () => {
  
  test('Get account info', async () => {
    const api = new KunaPrivate(KEYS)
    const data = await api.getAccountInfo()

    expect(data.email).toBeDefined();
    expect(data.activated).toBe(true);
  });

});