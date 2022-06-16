import { IKeys, IKunaApiV2 } from "../interfaces"
import KunaPrivate from "./private"
import KunaPublic from "./public"

/**
 * Get v2 kuna API instances
 * @param keys - object { publicKey, secretKey } 
 */
export default function(keys: IKeys) : IKunaApiV2 {
  return { 
    public: new KunaPublic(),
    private: new KunaPrivate(keys)
  }
}
