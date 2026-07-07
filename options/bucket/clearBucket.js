import { HOST } from '../../env.js'
import { argsValidation } from '../../utilites/args-validation.js'

export async function clearBucketOption() {
    const bucketName = process.argv[4]
    if (!argsValidation([bucketName])) { return }

    const res = await fetch(`${HOST}/bucket/clear?bucketName=${bucketName}`, {
        method: "DELETE",
    })
    const response = await res.json()
    console.log(response?.data ?? response?.message)
}