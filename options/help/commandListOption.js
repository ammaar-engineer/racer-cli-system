export function commandListOption() {
    const commands = {
        snippet: {
            description: 'Manage code snippets',
            actions: {
                '--execute': 'Execute a snippet command',
                '--download': 'Download snippets from remote',
                '--create': 'Create a new snippet',
                '--list': 'List local snippets'
            }
        },
        file: {
            description: 'Manage files',
            actions: {
                '--upload': 'Upload a file',
                '--delete': 'Delete a file',
                '--download': 'Download a file'
            }
        },
        bucket: {
            description: 'Manage storage buckets',
            actions: {
                '--create': 'Create a new bucket',
                '--clear': 'Clear bucket contents',
                '--delete': 'Delete a bucket',
                '--peek': 'View bucket contents',
                '--list': 'List all buckets'
            }
        },
        config: {
            description: 'Manage configuration',
            actions: {
                '--create-chat-preferences': 'Create chat preferences',
                '--list': 'List current configuration',
                '--set-host': 'Set backend host URL'
            }
        },
        ai: {
            description: 'AI chat features',
            actions: {
                '--new-session': 'Create a new chat session',
                '--delete-session': 'Delete a chat session',
                '--list-session': 'List all chat sessions',
                '--use-session': 'Use a specific chat session',
                '--chat': 'Start AI chat',
                '--clear-session': 'Clear a chat session'
            }
        },
        tool: {
            description: 'Text processing tools',
            actions: {
                '--compress-text': 'Compress text',
                '--uncompress-text': 'Uncompress text'
            }
        },
        help: {
            description: 'Display help information',
            actions: {
                '--command': 'List all available commands'
            }
        }
    }

    console.log('\nRacer CLI - Available Commands\n')
    console.log('Usage: racer <category> <action> [arguments]\n')

    for (const [category, info] of Object.entries(commands)) {
        console.log(`\n${category.toUpperCase()}: ${info.description}`)
        for (const [action, description] of Object.entries(info.actions)) {
            console.log(`  racer ${category} ${action}\n    → ${description}`)
        }
    }

    console.log('\n')
}
