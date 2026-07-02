import fs from 'fs'
import os from 'os'
import path from 'path'


export function ensureRacerFolder() {
    const racerPath = path.join(os.homedir(), '.racer')
    const snippetsPath = path.join(racerPath, 'snippets.racer')
    const configPath = path.join(racerPath, 'config.racer')
    const aichatPath = path.join(racerPath, 'aichat')
    
    // Create .racer folder if it doesn't exist
    if (!fs.existsSync(racerPath)) {
        fs.mkdirSync(racerPath, { recursive: true })
    }
    
    // Create snippets.racer with empty array if it doesn't exist
    if (!fs.existsSync(snippetsPath)) {
        fs.writeFileSync(snippetsPath, JSON.stringify([], null, 2))
    }
    
    // Create config.racer with empty object if it doesn't exist
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify({
            "current-chat-session": null,
            "user-preferences": null,
            "ai_modelId": null,
            "ai_url": null,
            "ai_apiKey": null
        }, null, 2))
    }
    
    // Create aichat folder if it doesn't exist
    if (!fs.existsSync(aichatPath)) {
        fs.mkdirSync(aichatPath, { recursive: true })
    }
}
