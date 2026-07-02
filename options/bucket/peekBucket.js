import { HOST } from '../../env.js'

export async function peekBucketOption() {
    const bucketName = process.argv[4]
    const res = await fetch(`${HOST}/bucket/peek?bucketName=${bucketName}`)
    const response = await res.json()
    console.log(response?.data ?? response?.message)
}