import { HOST } from '../../env.js'
import { spawn } from 'child_process'
import { homedir } from 'os'
import { join } from 'path'

export async function snippetDownloadOption() {
    const res = await fetch(`${HOST}/snippet/lists`)
    const response = await res.json()
    const snippets = response.data.snippets

    const racerDir = join(homedir(), '.racer')
    const snippetsPath = join(racerDir, 'snippets.racer')
    const snippetsJson = JSON.stringify(snippets, null, 2)

    spawn(`mkdir -p "${racerDir}" && echo '${snippetsJson}' > "${snippetsPath}"`, {shell: true})
    console.log("Snippet downloaded to ~/.racer/snippets.racer")
}