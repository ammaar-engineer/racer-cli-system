import { configurationFileData } from "./modules/see-config.js"

const { configData } = configurationFileData()
// export const HOST = 'http://backend.local.192.168.18.18.nip.io'
export const HOST = configData["backend_host"]
