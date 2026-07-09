import fs from 'fs'
import os from 'os'
import path from 'path'
import { configurationFileData } from '../../modules/see-config.js'
import { argsValidation } from '../../utilites/args-validation.js'

export async function createChatSessionOption() {
  const sessionName = process.argv[4]
  if (!argsValidation([sessionName])) { return }

  const { configData, pathToConfig } = configurationFileData()
  const pathToSession = path.join(
    os.homedir(),
    '.racer',
    'aichat',
    sessionName
  )
  if (fs.existsSync(pathToSession)) { console.log("Session already exist"); return }
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
