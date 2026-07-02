import { configurationFileData } from "../../modules/see-config.js"
import fs from 'fs'

export function createChatPreferencesOption() {
    const {configData, pathToConfig} = configurationFileData()
    const userPreferences = process.argv[4]
    fs.writeFileSync(pathToConfig, JSON.stringify({
        ...configData,
        "user-preferences": userPreferences
    }))
    console.log(`New preferences added: ${userPreferences}`)
}