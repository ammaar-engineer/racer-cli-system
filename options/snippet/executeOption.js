import {spawn} from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'

let textSnippet = {}
const osHome = os.homedir() 

export function executeOption() {
  const pathSnippetJson = path.join(osHome, '.racer', 'snippets.racer')
  const snippetData = fs.readFileSync(pathSnippetJson)
  JSON.parse(snippetData.toString()).forEach(data => {
    textSnippet[data.alias] = data.content
  })

  const userCommand = process.argv[4]
  let extractedCommand = []
  const rawCommand = userCommand.split(' ')
  rawCommand.forEach(command => {
    extractedCommand.push(textSnippet[command] ? textSnippet[command] : command)
  })
  
  const child = spawn(extractedCommand.join(' '), { shell: true })
  child.stdout.on('data', (bf) => {
    process.stdout.write(bf)
  })
  child.stderr.on('data', (bf) => {
    process.stderr.write(bf)
  })
}