import {spawn} from 'child_process'


const allTools = {
    "terminalExecute": (command) => {
        return new Promise((resolve, reject) => {
            let outputTerminal = ''
            const child = spawn(command, {shell: true})
            child.stdout.on('data', (output) => {
                outputTerminal += output
                process.stdout.write(output)
            })
            child.stderr.on('data', (output) => {
                outputTerminal += output
                process.stderr.write(output)
            })
            child.on('close', (code) => {
                resolve(outputTerminal || 'Terminal execution success')
            })
        })
    }
}


export async function toolCallExecutions(calledTools) {
    // Kunci bisa panggil tools lebih dari sekali
    const tool_array = JSON.parse(calledTools.function.arguments).command
    let toolOutput = {}
    for await (const command of tool_array) {
        toolOutput[command] = await allTools['terminalExecute'](command) 
    }
    return JSON.stringify(toolOutput)
}