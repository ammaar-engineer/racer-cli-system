import readline from 'readline/promises'
import { stdout, stdin } from 'process'

const rl = readline.createInterface({ input: stdin, output: stdout })
const questionAnswer = await rl.question("Whats your name again?")
console.log(questionAnswer)
