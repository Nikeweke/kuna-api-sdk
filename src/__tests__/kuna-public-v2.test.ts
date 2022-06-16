import KunaPublic from '../v2/public'
 
describe('Kuna.public v2:', () => {
  
  test('Get unixtime', async () => {
    const kunaPublic = new KunaPublic()
    const unixtime = await kunaPublic.getUnixTime()
    expect(typeof unixtime === 'string').toBe(true);
  });

});