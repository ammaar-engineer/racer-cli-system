export async function textUncompressText() {
    const baseText = process.argv[4]
    const binaryString = atob(baseText);
    const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0));
    
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'));
    const response = new Response(stream);
    console.log(await response.text())
}