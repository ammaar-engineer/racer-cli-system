import { HOST } from '../../env.js'

export async function createBucketOption() {
    const bucketName = process.argv[4]
    console.log(bucketName)
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