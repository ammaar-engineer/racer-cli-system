import {spawn} from 'child_process'
import { HOST } from '../../env.js'
import { argsValidation } from '../../utilites/args-validation.js'

export async function downloadFileOption() {
    const fileName = process.argv[4] == "undefined" ? null : process.argv[4]
    const bucketName = process.argv[5] == "undefined" ? null : process.argv[5]

    if (!argsValidation([fileName, bucketName])) { return }

    const res = await fetch(`${HOST}/file/download?bucketName=${bucketName}&fileName=${fileName}`)
    const response = await res.json()
    if (!response.data) {
        console.log(response.message)
        return
    }
    console.log(response.data.url)
    console.log("File has been downloaded")
    const child = spawn(`curl "${response.data.url}" > ${fileName}`, {shell: true})
    child.stdout.on('data', (bf) => {
        process.stdout.write(bf)
    })
}