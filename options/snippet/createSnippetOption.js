import fs from 'fs'
import { HOST } from '../../env.js'
import { argsValidation } from '../../utilites/args-validation.js'

export async function createSnippetOption() {
  const file = process.argv[4]
  // Validation
  if (!argsValidation([file])) { return }
  const snippetData = fs.readFileSync(file)
  const arraySnippetData = JSON.parse(snippetData.toString())
  const res = await fetch(`${HOST}/snippet/create`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(arraySnippetData)
  })
  const response = await res.json()
  console.log(response?.data ?? response?.message)
}
