import readline from 'readline/promises'
import { stdin, stdout } from 'process'
import fs from 'fs'

export async function fileSelectionInFolder(dirPath, question, { emptyErr }) {
  const filesInDir = fs.readdirSync(dirPath)
  filesInDir.forEach((file, i) => {
    console.log(`${i + 1}. ${file}`)
  })
  if (filesInDir.length == 0) {
    console.log(emptyErr || "No files found")
    process.exit(1)
  }
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
