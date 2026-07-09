import { chatAi, setClient } from '../../modules/ai-chat.js'
import { toolCallExecutions } from '../../modules/toolCallExecution.js'
import os from 'os'
import fs from 'fs'
import path from 'path'
import { configurationFileData } from '../../modules/see-config.js'
import { argsValidation } from '../../utilites/args-validation.js'
import readline from 'readline/promises'
import { stdout, stdin } from 'process'

export async function AiOption(tool = false) {
  //  const userRequest = process.argv[4]
  // if (!argsValidation([userRequest])) { return }
  const { configData } = configurationFileData()
  const chatSession = configData["current-chat-session"]
  let sessionFileExist = fs.existsSync(path.join(
    os.homedir(),
    '.racer',
    'aichat',
    chatSession
  ))
  if (!chatSession || !sessionFileExist) {
    console.log("Create and select chat session first")
    process.exit(1)
  }
  const rl = readline.createInterface({ input: stdin, output: stdout })
  let userRequest = ''
  if (!tool) {
    const userChat = await rl.question("[Your Chat]: ")
    if (userChat == "") {
      console.log("Enter chat content properly")
      rl.close()
      AiOption()
    }
    userRequest = userChat
  }
  setClient()
  const conversationFile = path.join(
    os.homedir(),
    '.racer',
    'aichat',
    chatSession
  )
  let conversationData = []

  try {
    const data = fs.readFileSync(conversationFile)
    conversationData = JSON.parse(data.toString())
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Chat file corrupted or not exist. Create new chat session first', + '\n')
      process.exit(1)
    }
  }

  const insertUserRequest = [
    ...conversationData,
    { role: "user", content: userRequest }
  ]
  // console.log(tool ? [...conversationData] : [...insertUserRequest])
  const { content, tool_calls } = await chatAi({
    stream: false,
    messages: tool ? [...conversationData] : [...insertUserRequest]
  })
  // Mode tool
  if (!content) {
    const toolOp = await toolCallExecutions(tool_calls[0])
    fs.writeFileSync(conversationFile, JSON.stringify(
      [...insertUserRequest,
      { role: "tool", content: toolOp }
      ]
    ))
    setTimeout(() => {
      tool ? null : rl.close()
      AiOption(true)
    }, 2400);
    return
  }
  const writeAiResponseAndSave = fs.writeFileSync(conversationFile, JSON.stringify(
    [...conversationData,
    { role: "assistant", content }
    ]
  ))
  process.stdout.write(content + '\n')
  rl.close()
  AiOption()
}
