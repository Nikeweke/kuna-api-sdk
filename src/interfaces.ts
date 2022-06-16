import KunaPublicV3 from "./v3/public"
import KunaPrivateV3 from './v3/private'
import KunaPublicV2 from "./v2/public"
import KunaPrivateV2 from './v2/private'

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


interface ObjectOfString {
  [key: string]: string
}



export {
  IKeys,
  IKunaApiV3,
  IKunaApiV2,
  ObjectOfString,
}