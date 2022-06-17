import KunaPublicV3 from "./v3/public"
import KunaPrivateV3 from './v3/private'
import KunaPublicV2 from "./v2/public"
import KunaPrivateV2 from './v2/private'
import { Method } from 'axios'

interface IKeys {
  publicKey: string
  secretKey: string
}

interface IKunaApiV3 {
  public: KunaPublicV3
  private: KunaPrivateV3
}

interface IKunaApiV2 {
  public: KunaPublicV2
  private: KunaPrivateV2
}

interface KunaApiPublic {
  getTicker(market: string) : Promise<any>
  getOrderBook(market: string) : Promise<any>
  getUnixTime() : Promise<number | string>
  getHistoryTrades(market:  string) : Promise<Array<Object>> // v3 has not implemented this one
  request(url_api: string, method: Method, payload: object) : Promise<any>
}

interface KunaApiPrivate {
  getAccountInfo() : Promise<any>
  getOrders(market: string) : Promise<any>
}

export {
  IKeys,
  IKunaApiV3,
  IKunaApiV2,

  KunaApiPublic,
  KunaApiPrivate,
}