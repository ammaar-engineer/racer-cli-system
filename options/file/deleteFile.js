import { HOST } from "../../env.js"

export async function deleteFileOption() {
    const fileName = process.argv[4]
    const bucketName = process.argv[5]
    const res = await fetch(`${HOST}/file/delete?fileName=${fileName}&bucketName=${bucketName}`, {
        method: 'DELETE'
    })
    const response = await res.json()
    console.log(response?.data ?? response?.message)
}