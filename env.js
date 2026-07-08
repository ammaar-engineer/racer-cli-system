import { configurationFileData } from "./modules/see-config.js"

const { configData } = configurationFileData()
export const HOST = configData["backend_host"]
