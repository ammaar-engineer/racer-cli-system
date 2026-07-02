import {ChatPromptTemplate} from '@langchain/core/prompts'
import {StringOutputParser} from '@langchain/core/output_parsers'
import { configurationFileData } from './modules/see-config.js'
import { ChatOpenAI } from '@langchain/openai'

const {configData} = configurationFileData()

const llm = new ChatOpenAI({
    apiKey: configData['ai_apiKey'],
    model: configData['ai_modelId'],
    configuration: {
        baseURL: configData['ai_url']
    }
})

const prompts = ChatPromptTemplate.fromMessages([
    ["system", "{system_role}"],
    ["human", "{question}"]
])

const parser = new StringOutputParser()

const chain = prompts.pipe(llm).pipe(parser)

const response = await chain.invoke({
    system_role: "I use arch",
    question: "What the best distro?"
})
console.log(response)