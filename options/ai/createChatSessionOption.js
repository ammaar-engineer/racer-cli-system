import fs from 'fs'
import os from 'os'
import path from 'path'
import { configurationFileData } from '../../modules/see-config.js'

export function createChatSessionOption() {
    const {configData, pathToConfig} = configurationFileData()
    const sessionName = process.argv[4]
    const pathToSession = path.join(
        os.homedir(),
        '.racer',
        'aichat',
        sessionName
    )
    fs.writeFileSync(pathToConfig, JSON.stringify({
        ...configData,
        "current-chat-session": sessionName
    }))
    fs.writeFileSync(pathToSession, JSON.stringify([{
        "role": "system",
        "content": configData['user-preferences'] || ''
    }]))
    console.log("New session created: " + sessionName)
}