import {spawn} from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { argsValidation } from '../../utilites/args-validation.js'

let textSnippet = {}
const osHome = os.homedir() 

export function executeOption() {
  const userCommand = process.argv[4]
  if (!argsValidation([userCommand])) { return }

  const pathSnippetJson = path.join(osHome, '.racer', 'snippets.racer')
  const snippetData = fs.readFileSync(pathSnippetJson)
  JSON.parse(snippetData.toString()).forEach(data => {
    textSnippet[data.alias] = data.content
  })

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