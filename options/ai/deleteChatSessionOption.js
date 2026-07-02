import fs from 'fs'
import os from 'os'
import path from 'path'


export function deleteChatSessionOption() {
    const selectedSession = process.argv[4]
    const pathToChatSession = path.join(
        os.homedir(),
        '.racer',
        'aichat',
        selectedSession
    )
    
    if (!fs.existsSync(pathToChatSession)) {
        console.error(`Error: Chat session file not found: ${pathToChatSession}`)
        process.exit(1)
    }
    
    fs.unlinkSync(pathToChatSession)
    console.log(`Session ${selectedSession} deleted`)
}