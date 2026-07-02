import { HOST } from "../../env.js";

export async function listBucketOption() {
    const res = await fetch(`${HOST}/bucket/list`)
    const response = await res.json()
    console.log(response.data ?? response.message)
}