import fs from 'fs'

export function createIfDidntExist({ err, path, data }) {
  if (err.code === 'ENOENT') {
    fs.writeFileSync(path, data)
  }
}
