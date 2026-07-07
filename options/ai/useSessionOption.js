import { configurationFileData } from "../../modules/see-config.js";
import fs from 'fs'
import path from 'path'
import os from 'os'
import { argsValidation } from "../../utilites/args-validation.js";

export function useSessionOption() {
    const selectedSession = process.argv[4]
    if (!argsValidation([selectedSession])) { return }

    const {pathToConfig, configData} = configurationFileData()
    const newSession = {...configData, "current-chat-session": selectedSession}
    fs.writeFileSync(pathToConfig, JSON.stringify(newSession))
    console.log("Session used: ", selectedSession)
}