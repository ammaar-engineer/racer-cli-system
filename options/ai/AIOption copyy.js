import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, AIMessage, ToolMessage } from '@langchain/core/messages'
import { toolCallExecutions } from '../../modules/toolCallExecution.js'
import { configurationFileData } from '../../modules/see-config.js'
import os from 'os'
import fs from 'fs'
import path from 'path'

// Fungsi helper untuk mengubah JSON biasa ke format object Message LangChain
function mapToLangChainMessages(jsonData) {
    return jsonData.map(msg => {
        if (msg.role === 'user' || msg.role === 'human') return new HumanMessage(msg.content);
        if (msg.role === 'assistant' || msg.role === 'ai') return new AIMessage({ content: msg.content, tool_calls: msg.tool_calls });
        if (msg.role === 'tool') return new ToolMessage({ content: msg.content, tool_call_id: msg.tool_call_id || "id" });
        return new HumanMessage(msg.content); // fallback
    });
}

export async function AiOption(tool = false) {
    const { configData } = configurationFileData()
    const {configurationData} = configurationFileData()
    const chatSession = configData["current-chat-session"]
    if (!chatSession) {
        console.log("Select chat session" + '\n')
        process.exit(1)
    }

    const userRequest = process.argv[4]
    const conversationFile = path.join(os.homedir(), '.racer', 'aichat', chatSession)
    let conversationData = []

    try {
        const data = fs.readFileSync(conversationFile)
        conversationData = JSON.parse(data.toString())
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('Chat file corrupted or not exist. Create new chat session first\n')
            process.exit(1)
        }
    }

    // 1. Setup Inisialisasi Model LangChain
    const llm = new ChatOpenAI({
        apiKey: configData['ai_apiKey'],
        model: configData['ai_modelId'],
        configuration: { baseURL: configData['ai_url'] }
    })

    let insertUserRequest = [...conversationData];
    if (!tool) {
        insertUserRequest.push({ role: "user", content: userRequest });
    }

    // 2. Convert history data menjadi instance Message LangChain
    const langchainMessages = mapToLangChainMessages(insertUserRequest);

    try {
        // 3. Eksekusi menggunakan .invoke()
        const aiMsg = await llm.invoke(langchainMessages);

        // Mode tool call
        if (aiMsg.tool_calls && aiMsg.tool_calls.length > 0) {
            // Catat dulu requirement tool call dari AI ke dalam file history
            const updatedHistoryWithToolCall = [
                ...insertUserRequest,
                { role: "assistant", content: aiMsg.content || "", tool_calls: aiMsg.tool_calls }
            ];
            
            // Eksekusi tool local Anda
            const toolOp = await toolCallExecutions(aiMsg.tool_calls[0]);
            
            // Masukkan hasil eksekusi tool dengan role "tool"
            fs.writeFileSync(conversationFile, JSON.stringify([
                ...updatedHistoryWithToolCall,
                { role: "tool", content: toolOp, tool_call_id: aiMsg.tool_calls[0].id }
            ], null, 2));

            setTimeout(() => {
                AiOption(true);
            }, 2400);
            return;
        }

        // Mode respon teks biasa
        fs.writeFileSync(conversationFile, JSON.stringify([
            ...insertUserRequest,
            { role: "assistant", content: aiMsg.content }
        ], null, 2));

        process.stdout.write(aiMsg.content + '\n');

    } catch (error) {
        console.error("LangChain Error:", error.message);
    }
}
