import multer from 'multer'
import path from 'path'

import { IUploadFile } from './upload.interface'

const DEFAULT_ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']
const DEFAULT_MAX_FILE_SIZE = 1024 * 1024 * 5 // 5MB

const uploader = ({
  allowedFileTypes = DEFAULT_ALLOWED_FILE_TYPES,
  errorMessage = 'Invalid file type',
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
}: IUploadFile) => {
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname)
      const fileName = `${file.originalname
        .replace(fileExt, '')
        .toLowerCase()
        .split(' ')
        .join('-')}-${Date.now()}`

      cb(null, fileName + fileExt)
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileFilter = (req: any, file: any, cb: any) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(errorMessage))
    }
  }

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxFileSize,
    },
  })

  return upload
}

export default uploader
