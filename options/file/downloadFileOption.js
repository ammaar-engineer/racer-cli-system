import {spawn} from 'child_process'
import { HOST } from '../../env.js'

export async function downloadFileOption() {
    const fileName = process.argv[4]
    const bucketName = process.argv[5]

    const res = await fetch(`${HOST}/file/download?bucketName=${bucketName}&fileName=${fileName}`)
    const response = await res.json()
    if (!response.data) {
        console.log(response.message)
        return
    }
    console.log(response)
    const child = spawn(`curl -o ${fileName} ${response.data.url}`, {shell: true})
    child.stdout.on('data', (bf) => {
        process.stdout.write(bf)
    })
}