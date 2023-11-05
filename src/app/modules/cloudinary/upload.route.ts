// routes/imageRoutes.ts
import express from 'express'
import { UploadController } from './upload.controller'
import fileUploadMiddleware from './fileUploadMiddleware'

const router = express.Router()

router.post(
  '/imageupload',
  fileUploadMiddleware,
  UploadController.uploadFileController
)

export const UploadRoute = router
