import readline from 'readline/promises'
import { stdin, stdout } from 'process'
import fs from 'fs'

export async function fileSelectionInFolder(dirPath, question) {
  const filesInDir = fs.readdirSync(dirPath)
  filesInDir.forEach((file, i) => {
    console.log(`${i + 1}. ${file}`)
  })
  const rl = readline.createInterface({ input: stdin, output: stdout })
  const userSelectionString = await rl.question(question + " ")
  const userSelectionNumber = Number(userSelectionString) - 1
  if (!filesInDir[userSelectionNumber]) {
    console.log("Select correct file")
    fileSelectionInFolder(dirPath, question)
    return
  }
  rl.close()
  return filesInDir[userSelectionNumber]
}
