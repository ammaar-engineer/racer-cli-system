import { configurationFileData } from "../../modules/see-config.js";
import fs from 'fs'
import path from 'path'
import os from 'os'

export function useSessionOption() {
    const {pathToConfig, configData} = configurationFileData()
    const selectedSession = process.argv[4]
    const newSession = {...configData, "current-chat-session": selectedSession}
    fs.writeFileSync(pathToConfig, JSON.stringify(newSession))
    console.log("Session used: ", selectedSession)
}