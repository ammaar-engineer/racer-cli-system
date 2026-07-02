import { HOST } from '../../env.js'

export async function deleteBucketOption() {
    const bucketName = process.argv[4]
    console.log(bucketName)
    const res = await fetch(`${HOST}/bucket/delete?bucketName=${bucketName}`, {
        method: 'DELETE'
    })
    const response = await res.json()
    console.log(response?.data ?? response?.message)
}