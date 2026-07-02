import fs from 'fs'
import os, { homedir } from 'os'
import path from 'path'
import { createIfDidntExist } from '../../utilites/handleFileExistence.js'

const homeDir = os.homedir()

export async function snippetLocalListOption() {
    const pathToSnippet = path.join(homeDir, '.racer', 'snippets.racer')
    
    try {
        const localSnippet = fs.readFileSync(pathToSnippet)
        console.log(JSON.parse(localSnippet.toString()))
    } catch (err) {
        if (err.code === 'ENOENT') {
            createIfDidntExist({ err, path: pathToSnippet, data: '[]' })
            console.log([])
        } else {
            throw err
        }
    }
}