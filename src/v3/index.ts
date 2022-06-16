import { IKeys, IKunaApiV3 } from "../interfaces"
import KunaPrivate from "./private"
import KunaPublic from "./public"

/**
 * Get v3 kuna API instances
 * @param keys - object { publicKey, secretKey } 
 */
export default function(keys: IKeys) : IKunaApiV3 {
  return { 
    public: new KunaPublic(),
    private: new KunaPrivate(keys)
  }
}