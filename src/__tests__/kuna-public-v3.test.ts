import KunaPublic from '../v3/public'
 
describe('Kuna.public v3:', () => {
  
  test('Get unixtime', async () => {
    const kunaPublic = new KunaPublic()
    const unixtime = await kunaPublic.getUnixTime()
    expect(typeof unixtime === 'number').toBe(true);
  });

});