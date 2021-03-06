import multer from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export default {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (_, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    }
  }),
  tmpFolder
}
