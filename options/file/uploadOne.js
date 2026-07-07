import { HOST } from '../../env.js'
import fs from 'fs'
import { argsValidation } from '../../utilites/args-validation.js'

export async function uploadOneOption() {
  const formData = new FormData()
  const selectedFile = process.argv[4]
  const bucketName = process.argv[5]

  if (!argsValidation([selectedFile, bucketName])) { return }

  const fileStream = fs.createReadStream(selectedFile)
  fs.stat(selectedFile, async (err, stat) => {
    
    const res = await fetch(`${HOST}/file/upload`, {
      method: 'POST',
      body: fileStream,
      duplex: 'half',
      headers: {
        'Content-Type': 'application/octet-stream',
        'x-file-name': selectedFile,
        'x-bucket-name': bucketName,
        'content-length': stat.size
      }
    })
  
    const response = await res.json()
    console.log(response.data ?? response.message)
  })
}