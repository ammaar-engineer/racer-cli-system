import fs from 'fs'

export async function textCompressOption() {
    const text = process.argv[4]
    const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('deflate'))
    const response = new Response(stream)
    const buffer = await response.arrayBuffer()

    console.log(btoa(String.fromCharCode(...new Uint8Array(buffer))))
}

