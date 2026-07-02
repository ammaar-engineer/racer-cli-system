import fs from 'fs'
import os from 'os'
import path from 'path'


export function clearSessionOption() {
    const pathToAiChatFolder = path.join(
        os.homedir(),
        '.racer',
        'aichat'
    )
    
    if (!fs.existsSync(pathToAiChatFolder)) {
        console.error(`Error: AI chat folder not found: ${pathToAiChatFolder}`)
        process.exit(1)
    }
    
    const files = fs.readdirSync(pathToAiChatFolder)
    
    if (files.length === 0) {
        console.log('No chat sessions to clear')
        return
    }
    
    files.forEach(file => {
        const filePath = path.join(pathToAiChatFolder, file)
        if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath)
        }
    })
    
    console.log(`Cleared ${files.length} chat session(s)`)
}