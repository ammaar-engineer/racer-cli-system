import { HOST } from '../../env.js'
import { argsValidation } from '../../utilites/args-validation.js'

export async function deleteBucketOption() {
    const bucketName = process.argv[4]
    if (!argsValidation([bucketName])) { return }

    const res = await fetch(`${HOST}/bucket/delete?bucketName=${bucketName}`, {
        method: 'DELETE'
    })
    const response = await res.json()
    console.log(response?.data ?? response?.message)
}