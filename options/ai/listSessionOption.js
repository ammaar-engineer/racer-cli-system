import os from 'os'
import fs from 'fs'
import path from 'path'

export function listSessionOption() {
    const pathToSessionFolder = path.join(
        os.homedir(),
        '.racer',
        'aichat'
    )
    const fileList = fs.readdirSync(pathToSessionFolder)
    console.log(fileList)
}