import {OpenAI} from 'openai'
import { configurationFileData } from './see-config.js'


function setClient () {
    const {configData} = configurationFileData()
    const ai_data = {
        ai_url: configData['ai_url'],
        ai_apiKey: configData['ai_apiKey'],
        ai_modelId: configData['ai_modelId']
    }
    let client = null
    if (!Object.values(ai_data).includes('')) {
        client = new OpenAI({
            apiKey: ai_data['ai_apiKey'],
            baseURL: ai_data['ai_url']
        });
    }
    return {
        client,
        ai_model: ai_data['ai_modelId']
    }
}

export async function chatAi({stream, messages}) {
    const {ai_model, client} = setClient()
    if (!client) {
        console.error("You havent set AI provider yet")
        process.exit(1)
    }
    let debugData = null
    try {
        const response = await client.chat.completions.create({
            model: ai_model,
            messages,
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'terminalExecute',
                        description: 'Function for execute terminal command in linux',
                        parameters: {
                            type: 'array',
                            items: {type: 'string'},
                            description: "Insert all commands that needed. System will execute it one by one",
                            required: ['command']
                        }
                    }
                }
            ],
            stream
        })

        const content = response.choices[0].message
        debugData = {
            content: content.content,
            tool_calls: content.tool_calls
        }
        return {
            content: content.content,
            tool_calls: content.tool_calls
        }
    } catch (error) {
        console.dir(debugData)
        console.error("Error: Failed to connect to AI provider. Please check your ai_url and ai_apiKey configuration.");
        console.error("Details:", error.message);
        process.exit(1);
    }
}