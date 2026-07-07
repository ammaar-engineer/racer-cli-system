import { HOST } from '../../env.js'
import { argsValidation } from '../../utilites/args-validation.js'

export async function peekBucketOption() {
    const bucketName = process.argv[4]
    if (!argsValidation([bucketName])) { return }
    const res = await fetch(`${HOST}/bucket/peek?bucketName=${bucketName}`)
    const response = await res.json()
    console.log(response?.data ?? response?.message)
}