import fs from 'fs'
import os from 'os'
import path from 'path'
import { createIfDidntExist } from '../utilites/handleFileExistence.js'

export function configurationFileData() {
    const pathToConfig = path.join(
        os.homedir(),
        '.racer',
        'config.racer'
    )
    try {
        const readConfig = fs.readFileSync(pathToConfig)
        return {
            configData: JSON.parse(readConfig.toString()),
            pathToConfig: pathToConfig
        }
    } catch (err) {
        createIfDidntExist({
            err,
            path: pathToConfig,
            data: JSON.stringify({})
        })
        return {
            configData: JSON.parse('{}'),
            pathToConfig: pathToConfig,
        }
    }
}