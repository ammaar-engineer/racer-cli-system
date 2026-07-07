import { HOST } from '../../env.js'
import { argsValidation } from '../../utilites/args-validation.js'

export async function createBucketOption() {
    const bucketName = process.argv[4] ?? null
    if (!argsValidation([bucketName])) { return }

    const res = await fetch(`${HOST}/bucket/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bucketName
        })
    })
    const response = await res.json()
    console.log(response?.data ?? response?.message)
}