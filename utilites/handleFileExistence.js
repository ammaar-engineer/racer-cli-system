import fs from 'fs'

export function createIfDidntExist({err, path, data}) {
    if (err.code === 'ENOENT') {
        const writeFile = fs.writeFileSync(path, data)
    }
}