/* eslint-disable @typescript-eslint/no-explicit-any */
// controllers/ImageController.ts
import { Request, Response } from 'express'
import { v2 as cloudinaryV2 } from 'cloudinary'
import config from '../../../config'
import httpStatus from 'http-status'

//cloudinary image hosting

const cloudName = config.cloud_name
const apiKey = config.api_key
const apiSecret = config.api_secret

cloudinaryV2.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
})

const uploadFileController = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]

    const uploadedImages = await Promise.all(
      files.map(async file => {
        const result = await cloudinaryV2.uploader.upload(
          file.path,
          (error: any) => {
            if (error) {
              return res.send(error)
            }
          }
        )

        return result.secure_url
      })
    )
    res.status(200).json({
      statusCode: httpStatus.OK,
      status: true,
      message: 'File uploaded successfully',
      images: uploadedImages,
    })
  } catch (error) {
    // next(error);
    res.status(500).json({ status: false, message: 'Internal Server Error' })
  }
}

export const UploadController = {
  uploadFileController,
}
