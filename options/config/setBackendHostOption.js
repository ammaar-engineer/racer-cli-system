import { configurationFileData } from "../../modules/see-config.js";
import fs from 'fs'
import { argsValidation } from "../../utilites/args-validation.js";

export function setBackendHostOption() {
  const backendUrl = process.argv[4]
  if (!argsValidation([backendUrl])) { return }

  const { configData, pathToConfig } = configurationFileData()
  const newData = {
    ...configData,
    backend_host: backendUrl
  }
  fs.writeFileSync(pathToConfig, JSON.stringify(newData))
  console.log("Host set successfully")
}
